import { Request, Response } from 'express';
import { CommentService } from './comment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all comments
const getAllComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await CommentService.getAllCommentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments retrieved successfully',
    data,
  });
});

// create comment
const createComment = catchAsync(async (req: Request, res: Response) => {
  const { ideaId } = req.params;
  const userId = req.user?.userId;
  const data = await CommentService.createCommentIntoDB(ideaId, userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data,
  });
});

// reply comment
const replyToComment = catchAsync(async (req: Request, res: Response) => {
  const { parentId } = req.params;
  const userId = req.user?.userId;
  const result = await CommentService.replyToCommentIntoDB(parentId, userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Reply added successfully',
    data: result,
  });
});

// update comment
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await CommentService.updateCommentIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data,
  });
});

// delete comment
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await CommentService.deleteCommentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: null,
  });
});

export const CommentController = {
  getAllComment,
  createComment,
  updateComment,
  deleteComment,
  replyToComment
};
