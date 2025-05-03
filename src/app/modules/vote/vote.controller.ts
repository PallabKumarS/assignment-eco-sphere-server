import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VoteService } from "./vote.service";
import { StatusCodes } from "http-status-codes";

const voteOnIdea = catchAsync(async (req: Request, res: Response) => {
    const { id: ideaId } = req.params;
    const userId = req.user?.userId; // make sure `auth` middleware adds `req.user`
    const { type } = req.body;

    const result = await VoteService.voteOnIdeaService(ideaId, userId, type);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Vote recorded successfully",
        data: result,
    });
});

const removeVote = catchAsync(async (req: Request, res: Response) => {
    const { id: ideaId } = req.params;
    const userId = req.user?.userId;

    const result = await VoteService.removeVoteService(ideaId, userId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Vote removed successfully",
        data: result,
    });
});

export const VoteController = {
    voteOnIdea,
    removeVote,
};
