/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserRole } from '@prisma/client';
import prisma from '../../utils/prismaClient';
import { AppError } from '../../errors/AppError';
import paginationHelper from '../../utils/paginationHelper';

const getAllUserFromDB = async (
  query: Record<string, unknown>,
): Promise<any> => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper(query);

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalData = await prisma.user.count();
  const totalPage = Math.ceil(totalData / limit);

  return {
    meta: {
      page,
      limit,
      totalData,
      totalPage,
    },
    data: result,
  };
};

const getUserByIdService = async (id: string): Promise<any> => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      password: false,
    },
  });
};

const updateUserByIdService = async (
  id: string,
  data: Partial<User>,
): Promise<any> => {
  return prisma.user.update({ where: { id }, data });
};

const deleteUserByIdService = async (id: string): Promise<any> => {
  return prisma.user.delete({ where: { id } });
};

const updateProfileStatusService = async (
  id: string,
  status: UserRole,
): Promise<any> => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const updateStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });

  return updateStatus;
};

const getIdeasByUserService = async (id: string): Promise<any> => {
  return await prisma.idea.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const getPurchasesByUserService = async (userId: string): Promise<any> => {
  return await prisma.paidIdeaPurchase.findMany({
    where: { userId },
    include: {
      idea: true, // return idea details
    },
    orderBy: { createdAt: 'desc' },
  });
};

// get personal profile from db
const getMeFromDB = async (email: string): Promise<any> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user;
};

// update user role

const updateUserRoleIntoDB = async (
  id: string,
  role: UserRole,
): Promise<any> => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return prisma.user
    .update({
      where: { id },
      data: role,
    })
    .catch((error) => {
      throw new AppError(400, error.message);
    });
};

export const UserService = {
  getAllUserFromDB,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  updateProfileStatusService,
  getIdeasByUserService,
  getPurchasesByUserService,
  getMeFromDB,
  updateUserRoleIntoDB,
};
