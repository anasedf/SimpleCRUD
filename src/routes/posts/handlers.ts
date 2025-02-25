import { NotFoundError } from "elysia";
import db from "./prismaClient";

export async function getPosts() {
    try {
        return await db.post.findMany({ orderBy: { createdAt: "asc" } });
    } catch (e) {
        console.error("Error getting posts:", e);
        return [];
    }
}

export async function getPost(id: number) {
    try {
        const post = await db.post.findUnique({ where: { id } });

        if (!post) {
            throw new NotFoundError('Post not found');
        }
        return post;
    } catch (e) {
        console.error("Error getting post:", e);
        return null;
    }
}

export async function createPost(options: { title: string; content: string }) {
    try {
        const { title, content } = options;

        return await db.post.create({
            data: { title, content }
        });
    } catch (e) {
        console.error("Error creating post:", e);
        return null;
    }
}

export async function updatePost(id: number, options: { title?: string; content?: string }) {
    try {
        const { title, content } = options;

        return await db.post.update({
            where: { id },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
            },
        });
    } catch (e) {
        console.error("Error updating post:", e);
        return null; 
    }
}

export async function deletePost(id: number) {
    try {
        return await db.post.delete({ where: { id } });
    } catch (e) {
        console.error("Error deleting post:", e);
        return null;
    }
}