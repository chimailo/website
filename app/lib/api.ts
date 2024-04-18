import { readdirSync, readFileSync, statSync } from 'fs'
import { extname, join } from 'path'
import matter from 'gray-matter'
import { Post } from '@/types';
import { slugify } from '@/app/lib/utils';

const src = process.cwd()

function getPath(type: string = 'blog') {
  return join(src, 'content', type)
}

function getFiles(dir: string, files: string[] = []) {
  const filenames = readdirSync(dir);

  filenames.forEach((file) => {
    const filePath = `${dir}/${file}`;
    if (statSync(filePath).isDirectory()) {
      getFiles(filePath, files);
    } else files.push(filePath)
  })
    return files
}

function getPosts(type: string = 'blog') {
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