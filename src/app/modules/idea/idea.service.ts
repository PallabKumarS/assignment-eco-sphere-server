import { Idea, IdeaStatus } from '@prisma/client';
import prisma from '../../utils/prismaClient';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { TIdea } from './idea.interface';

const createIdeaService = async (
  user: JwtPayload,
  data: TIdea,
): Promise<Idea> => {
  const userExists = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // new data for idea
  const { categories, ...restData } = data;

  const newData = {
    ...restData,
    authorId: userExists.id,
    categories: {
      connect: categories.map((id: string) => ({ id })),
    },
  };

  const idea = await prisma.idea.create({
    data: newData,
  });

  if (!idea) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create idea');
  }

  return idea;
};

const getAllIdeasService = async (query?: {
  categoryId?: string;
  search?: string;
}): Promise<Idea[]> => {
  const { categoryId, search } = query ?? {};

  return await prisma.idea.findMany({
    where: {
      status: 'APPROVED',
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { problem: { contains: search, mode: 'insensitive' } },
        ],
      }),
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getIdeaByIdService = async (id: string): Promise<Idea | null> => {
  const idea = await prisma.idea.findUnique({
    where: { id },
    include: {
      users: true,
      categories: true,
      votes: true,
      comments: true,
    },
  });

  if (!idea) {
    throw new AppError(httpStatus.NOT_FOUND, 'Idea not found');
  }
  return idea;
};

const updateIdeaService = async (
  id: string,
  data: Partial<Idea>,
): Promise<Idea> => {
  return await prisma.idea.update({
    where: { id },
    data,
  });
};

const deleteIdeaService = async (id: string): Promise<null> => {
  await prisma.idea.delete({ where: { id } });

  return null;
};

const changeIdeaStatusService = async (
  id: string,
  status: IdeaStatus,
  feedback?: string,
): Promise<Idea> => {
  return await prisma.idea.update({
    where: { id },
    data: { status, feedback },
  });
};

const getIdeaVotesService = async (
  ideaId: string,
): Promise<{ upVotes: number; downVotes: number }> => {
  const upVotes = await prisma.vote.count({
    where: { ideaId, type: 'UPVOTE' },
  });
  const downVotes = await prisma.vote.count({
    where: { ideaId, type: 'DOWNVOTE' },
  });

  return { upVotes, downVotes };
};

export const IdeaService = {
  createIdeaService,
  getAllIdeasService,
  getIdeaByIdService,
  updateIdeaService,
  deleteIdeaService,
  changeIdeaStatusService,
  getIdeaVotesService,
};
