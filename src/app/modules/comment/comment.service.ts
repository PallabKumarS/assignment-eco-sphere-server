import { Comment } from '@prisma/client';
import prisma from '../../utils/prismaClient';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

// get all comments from db
const getAllCommentFromDB = async (ideaId: string): Promise<Comment[]> => {
  const result = await prisma.comment.findMany({
    where: {
      ideaId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      user: true,
      parent: true,
    },
  });

  return result;
};

// create comment into db
const createCommentIntoDB = async (ideaId: string, userId: string, payload: Comment): Promise<Comment> => {
  const result = await prisma.comment.create({
    data: {
        ...payload,
        ideaId,
        userId
    },
    include: {
      user: true,
      parent: true,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create comment');
  }

  return result;
};

// create reply comment into db
const replyToCommentIntoDB = async (parentId: string, userId: string, payload: Comment):Promise<Comment> => {
    const comment = await prisma.comment.findUniqueOrThrow({ where: { id: parentId } });

    const result = await prisma.comment.create({
        data: {
          ...payload,
          ideaId: comment.ideaId,
          parentId,
          userId
        },
        include: {
          user: true,
          parent: true,
        },
    });

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create reply');
    }

    return result;
};

// update comment into db
const updateCommentIntoDB = async (
  id: string,
  payload: Partial<Comment>,
): Promise<Comment> => {
  const result = await prisma.comment.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
      parent: true,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update comment');
  }

  return result;
};

// delete comment from db
const deleteCommentFromDB = async (id: string): Promise<null> => {
  await prisma.comment.delete({
    where: {
      id,
    },
  });

  return null;
};

export const CommentService = {
  getAllCommentFromDB,
  createCommentIntoDB,
  updateCommentIntoDB,
  deleteCommentFromDB,
  replyToCommentIntoDB
};
