import { readdirSync, readFileSync, statSync } from 'fs'
import { extname, join } from 'path'
import matter from 'gray-matter'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";
import { Post } from '@/types';

const src = process.cwd()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return slug(str);
}

export function dateSort(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function getPath(type: string = 'blog') {
  return join(src, 'content', type)
}

export function getFiles(dir: string, files: string[] = []) {
  const filenames = readdirSync(dir);

  filenames.forEach((file) => {
    const filePath = `${dir}/${file}`;
    if (statSync(filePath).isDirectory()) {
      getFiles(filePath, files);
    } else files.push(filePath)
  })
    return files
}

export function getPosts(type: string = 'blog') {
  const path = getPath(type)

  return (files: string[] = []) => files.map((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(path.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (extname(fileName) !== '.md' && extname(fileName) !== '.mdx') return

    const source = readFileSync(file, 'utf8')

    const { data: frontmatter } = matter(source)

    if (frontmatter.draft) return
    return {
      ...frontmatter,
      slug: slugify(frontmatter.title),
      datePublished: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
    } as Post
  })
}

export const fetchPosts = getPosts()(getFiles(getPath()))