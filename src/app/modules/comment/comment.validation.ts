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

export const CommentValidation = {
  createCommentValidation,
  updateCommentValidation,
};
