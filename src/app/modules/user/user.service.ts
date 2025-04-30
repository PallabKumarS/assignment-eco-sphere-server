/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserRole } from '../../../../prisma/generated/prisma';
import prisma from '../../utils/prismaClient';

const getAllUserFromDB = async ():Promise<any> => {
  const result = await prisma.user.findMany();
  return result;
};

const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

const updateUserByIdService = async (id: string, data: Partial<User>) => {
  return prisma.user.update({ where: { id }, data });
};

const deleteUserByIdService = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

const updateProfileStatusService = async(id: string, status: UserRole) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  })

  const updateStatus = await prisma.user.update({
    where: {
      id
    },
    data: status
  })

  return updateStatus;
}

const getIdeasByUserService = async (id: string) => {
  return await prisma.idea.findMany({
    where: { 
      authorId: id 
    },
    orderBy: { 
      createdAt: "desc" 
    },
  });
};

const getPurchasesByUserService = async (userId: string) => {
  return await prisma.paidIdeaPurchase.findMany({
    where: { userId },
    include: {
      idea: true, // return idea details
    },
    orderBy: { createdAt: "desc" },
  });
};

export const UserService = { getAllUserFromDB, getUserByIdService, updateUserByIdService, deleteUserByIdService, updateProfileStatusService, getIdeasByUserService, getPurchasesByUserService };