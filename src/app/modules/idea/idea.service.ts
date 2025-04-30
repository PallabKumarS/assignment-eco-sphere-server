import { Idea, IdeaStatus } from '@prisma/client';
import prisma from '../../utils/prismaClient';

const createIdeaService = async (data: Idea) => {
    return await prisma.idea.create({
        data
    });
};

const getAllIdeasService = async (query?: { categoryId?: string; search?: string }) => {
    const { categoryId, search } = query || {};

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

const getIdeaByIdService = async (id: string) => {
    return await prisma.idea.findUnique({
        where: { id },
        include: {
            author: true,
            categories: true,
        },
    });
};

const updateIdeaService = async (id: string, data: Partial<Idea>) => {
    return await prisma.idea.update({
        where: { id },
        data,
    });
};

const deleteIdeaService = async (id: string) => {
    return await prisma.idea.delete({ where: { id } });
};

const changeIdeaStatusService = async (id: string, status: IdeaStatus, feedback?: string) => {
    return await prisma.idea.update({
        where: { id },
        data: { status, feedback },
    });
};

const getIdeaCommentsService = async (ideaId: string) => {
    return await prisma.comment.findMany({
        where: { ideaId },
        orderBy: { createdAt: 'asc' },
    });
};

const getIdeaVotesService = async (ideaId: string) => {
    const upvotes = await prisma.vote.count({ where: { ideaId, type: 'UPVOTE' } });
    const downvotes = await prisma.vote.count({ where: { ideaId, type: 'DOWNVOTE' } });

    return { upvotes, downvotes };
};

export const IdeaService = {
    createIdeaService,
    getAllIdeasService,
    getIdeaByIdService,
    updateIdeaService,
    deleteIdeaService,
    changeIdeaStatusService,
    getIdeaCommentsService,
    getIdeaVotesService,
};
