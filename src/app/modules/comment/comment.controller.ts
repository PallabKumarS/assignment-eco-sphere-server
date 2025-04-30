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
  const data = await CommentService.createCommentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data,
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
};
