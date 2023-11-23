import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export function getFilesFromPosts() {
    const files = fs.readdirSync(postsDir);
    return files;
}

export function getPostData(postFileName) {
    const postSlug = postFileName.replace(/\.md$/, '');
    const curFilePath = path.join(postsDir, `${postSlug}.md`);
    const fileData = fs.readFileSync(curFilePath, 'utf-8');
    const { data, content } = matter(fileData);

    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData;
}

export function getAllPosts() {
    const files = getFilesFromPosts();
    const allPosts = files.map((file) => {
        return getPostData(file);
    });

    const sortedPosts = allPosts.sort((postA, postB) => postB.date - postA.date);
    return sortedPosts;
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter((post) => post.isFeatured);

    if (!featuredPosts || featuredPosts.length === 0) {
        return [];
    }

    return featuredPosts;
}
