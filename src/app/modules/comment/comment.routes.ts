import { Router } from 'express';
import { CommentController } from './comment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = Router();

router.post(
    '/ideas/:id/comments',
    auth(UserRole.ADMIN, UserRole.MEMBER),
    validateRequest(CommentValidation.createComment),
    CommentController.createComment
);

router.post(
    '/comments/:id/replies',
    auth(UserRole.ADMIN, UserRole.MEMBER),
    validateRequest(CommentValidation.createReply),
    CommentController.replyToComment
);

router.patch(
    '/comments/:id',
    auth(UserRole.ADMIN, UserRole.MEMBER),
    validateRequest(CommentValidation.updateComment),
    CommentController.updateComment
);

router.delete(
    '/comments/:id',
    auth(UserRole.ADMIN, UserRole.MEMBER),
    CommentController.deleteComment
);

export const CommentRoutes = router;
