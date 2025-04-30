import { Request, Response } from 'express';
import { CommentService } from './comment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createComment = catchAsync(async (req: Request, res: Response) => {
    const ideaId = req.params.id;
    const { content, authorId } = req.body;

    const result = await CommentService.createCommentService({
        content,
        authorId,
        ideaId,
    });

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Comment added successfully',
        data: result,
    });
});

const replyToComment = catchAsync(async (req: Request, res: Response) => {
    const parentId = req.params.id;
    const { content, authorId } = req.body;

    const result = await CommentService.replyToCommentService({
        content,
        authorId,
        parentId,
    });

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Reply added successfully',
        data: result,
    });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    const result = await CommentService.updateCommentService(id, content);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Comment updated successfully',
        data: result,
    });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CommentService.deleteCommentService(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Comment deleted successfully',
        data: result,
    });
});

export const CommentController = {
    createComment,
    replyToComment,
    updateComment,
    deleteComment,
};