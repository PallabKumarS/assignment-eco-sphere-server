import { Router } from 'express';
import { CommentController } from './comment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Define routes
router.get('/', CommentController.getAllComment);

router.post(
  '/:ideaId',
  validateRequest(CommentValidation.createCommentValidation),
  CommentController.createComment,
);

router.post(
  '/:parentId',
  validateRequest(CommentValidation.createReplyValidation),
  CommentController.replyToComment
)

router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.MEMBER),
  validateRequest(CommentValidation.updateCommentValidation),
  CommentController.updateComment,
);

router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.MEMBER),
  CommentController.deleteComment,
);

export const CommentRoutes = router;
