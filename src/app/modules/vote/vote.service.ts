import { Vote, VoteType } from '@prisma/client';
import prisma from '../../utils/prismaClient';

const voteOnIdeaService = async (
  ideaId: string,
  userId: string,
  type: VoteType,
): Promise<Vote> => {
  return await prisma.vote.upsert({
    where: {
      userId_ideaId: { userId, ideaId },
    },
    update: { type },
    create: { ideaId, userId, type },
  });
};

const removeVoteService = async (
  ideaId: string,
  userId: string,
): Promise<Vote> => {
  return await prisma.vote.delete({
    where: {
      userId_ideaId: { userId, ideaId },
    },
  });
};

export const VoteService = {
  voteOnIdeaService,
  removeVoteService,
};
