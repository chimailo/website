export type Category = {
    name: string,
    slug: string,
    count?: number,
}

export type Post = {
    title: string,
    slug: string,
    body: string,
    summary?: string,
    datePublished?: string,
    dateUpdated?: string,
    readTime?: string,
    categories?: string[],
    keywords?: string[],
}