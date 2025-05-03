import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await UserService.getUserByIdService(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await UserService.updateUserByIdService(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await UserService.deleteUserByIdService(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
    data,
  });
});

const updateProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateProfileStatusService(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Updated status successfully',
    data: result,
  });
});

const getIdeasByUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.getIdeasByUserService(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Retrieved all ideas successfully',
    data: result,
  });
});

const getPurchasesByUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await UserService.getPurchasesByUserService(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Retrieved all purchased ideas successfully',
      data: result,
    });
  },
);

// get personal profile
const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserService.getMeFromDB(user.email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

// update user role controller
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await UserService.updateUserRoleIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User role updated successfully',
    data,
  });
});

export const UserController = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  updateProfileStatus,
  getIdeasByUser,
  getPurchasesByUser,
  getMe,
  updateUserRole,
};
