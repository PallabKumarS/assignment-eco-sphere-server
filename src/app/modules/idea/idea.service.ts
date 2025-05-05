import { Idea, IdeaStatus, Prisma } from '@prisma/client';
import prisma from '../../utils/prismaClient';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { TIdea } from './idea.interface';
import { TMeta } from '../../utils/sendResponse';
import paginationHelper from '../../utils/paginationHelper';

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

// get all ideas from db
const getAllIdeasService = async (query?: {
  categoryId?: string;
  searchTerm?: string;
}): Promise<{ data: Idea[]; meta: TMeta }> => {
  const { categoryId, searchTerm } = query ?? {};
  const options = paginationHelper(query as Record<string, unknown>);

  const whereConditions: Prisma.IdeaWhereInput = {
    status: 'APPROVED',
    ...(categoryId && { categoryId }),
    ...(searchTerm && {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { problem: { contains: searchTerm, mode: 'insensitive' } },
      ],
    }),
  };


  const data = await prisma.idea.findMany({
    where: whereConditions,
    orderBy: {
      [options.sortBy]: options.sortOrder,
    },
    skip: options.skip,
    take: options.limit,
    include: {
      categories: true,
      users: true,
    },
  });

  const total = await prisma.idea.count({
    where: whereConditions,
  });

  const totalPages = Math.ceil(total / options.limit);

  const meta:TMeta = {
    page: options.page,
    limit: options.limit,
    totalPage: totalPages,
    totalData: total,
  };

  return {
    data,
    meta,
  };
};

// get personal ideas
const getPersonalIdeasFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
): Promise<{ data: Idea[]; meta: TMeta }> => {
  const options = paginationHelper(query);

  const whereConditions = {
    authorId: user.id,
    ...(typeof query.categoryId === 'string' && {
      categoryId: query.categoryId,
    }),
    ...(typeof query.searchTerm === 'string' && {
      OR: [
        { title: { contains: query.searchTerm, mode: 'insensitive' } },
        { problem: { contains: query.searchTerm, mode: 'insensitive' } },
      ],
    }),
  } as Prisma.IdeaWhereInput;

  const data = await prisma.idea.findMany({
    where: whereConditions,
    orderBy: {
      [options.sortBy]: options.sortOrder,
    },
    skip: options.skip,
    take: options.limit,
    include: {
      categories: true,
      users: true,
    },
  });

  const total = await prisma.idea.count({
    where: whereConditions,
  });

  const totalPages = Math.ceil(total / options.limit);

  const meta:TMeta = {
    page: options.page,
    limit: options.limit,
    totalPage: totalPages,
    totalData: total,
  };

  return {
    data,
    meta,
  };
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
  getPersonalIdeasFromDB,
};
