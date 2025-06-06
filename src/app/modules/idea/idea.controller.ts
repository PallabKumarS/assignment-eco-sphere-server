import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IdeaService } from './idea.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createIdea = catchAsync(async (req: Request, res: Response) => {
  const result = await IdeaService.createIdeaService(req.user, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Idea created successfully',
    data: result,
  });
});

const getAllIdeas = catchAsync(async (req: Request, res: Response) => {
  const result = await IdeaService.getAllIdeasService(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Ideas retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

// get personal ideas
const getPersonalIdeas = catchAsync(async (req: Request, res: Response) => {
  const result = await IdeaService.getPersonalIdeasFromDB(req.query,req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Ideas retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getIdeaById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IdeaService.getIdeaByIdService(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Idea retrieved successfully',
    data: result,
  });
});

const updateIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IdeaService.updateIdeaService(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Idea updated successfully',
    data: result,
  });
});

const deleteIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IdeaService.deleteIdeaService(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Idea deleted successfully',
    data: result,
  });
});

const changeIdeaStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, feedback } = req.body;
  const result = await IdeaService.changeIdeaStatusService(
    id,
    status,
    feedback,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Idea status updated successfully',
    data: result,
  });
});

const getIdeaVotes = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await IdeaService.getIdeaVotesService(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Votes retrieved successfully',
    data: result,
  });
});

export const IdeaController = {
  createIdea,
  getAllIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  changeIdeaStatus,
  getIdeaVotes,
  getPersonalIdeas,
};
