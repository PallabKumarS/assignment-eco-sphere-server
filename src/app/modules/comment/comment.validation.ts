import { z } from "zod";

// Schema for creating a comment on an idea
const createComment = z.object({
    body: z.object({
        content: z.string({ required_error: "Content is required" }).min(1, "Content cannot be empty"),
        authorId: z.string({ required_error: "Author ID is required" }).uuid("Invalid author ID"),
    }),
});

// Schema for replying to a comment
const createReply = z.object({
    body: z.object({
        content: z.string({ required_error: "Reply content is required" }).min(1, "Reply cannot be empty"),
        authorId: z.string({ required_error: "Author ID is required" }).uuid("Invalid author ID"),
    }),
});

// Schema for updating a comment
const updateComment = z.object({
    body: z.object({
        content: z.string({ required_error: "Updated content is required" }).min(1, "Updated content cannot be empty"),
    }),
});

export const CommentValidation = {
    createComment,
    createReply,
    updateComment,
};