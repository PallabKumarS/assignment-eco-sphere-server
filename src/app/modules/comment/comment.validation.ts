import { z } from 'zod';

const createCommentValidation = z.object({
  body: z.object({
    content: z.string({
      required_error: 'Content is required',
    }),
    userId: z.string({
      required_error: 'User id is required',
    }),
    ideaId: z.string({
      required_error: 'Idea id is required',
    }),
    parentId: z.string().optional(),
  }),
});

const updateCommentValidation = createCommentValidation.partial();

// Schema for replying to a comment
const createReplyValidation = z.object({
    body: z.object({
        content: z.string({ required_error: "Reply content is required" }).min(1, "Reply cannot be empty"),
        authorId: z.string({ required_error: "Author ID is required" }).uuid("Invalid author ID"),
    }),
});

export const CommentValidation = {
  createCommentValidation,
  updateCommentValidation,
  createReplyValidation
};
