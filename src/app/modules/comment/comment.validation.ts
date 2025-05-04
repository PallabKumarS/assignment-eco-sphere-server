import { z } from 'zod';

const createCommentValidation = z.object({
  body: z.object({
    content: z.string({
      required_error: 'Content is required',
    }),
    parentId: z.string().optional(),
  }),
});

const updateCommentValidation = createCommentValidation.partial();

// Schema for replying to a comment
const createReplyValidation = z.object({
    body: z.object({
        content: z.string({ required_error: "Reply content is required" }).min(1, "Reply cannot be empty")
    }),
});

export const CommentValidation = {
  createCommentValidation,
  updateCommentValidation,
  createReplyValidation
};
