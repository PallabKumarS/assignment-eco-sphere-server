import { Comment } from "@prisma/client";
import prisma from "../../utils/prismaClient";

const createCommentService = async ({
    content,
    authorId,
    ideaId,
    parentId = null,
}: {
    content: string;
    authorId: string;
    ideaId: string;
    parentId?: string | null;
}) => {
    return await prisma.comment.create({
        data: {
            content,
            authorId,
            ideaId,
            parentId,
        },
    });
};

const replyToCommentService = async ({
    content,
    authorId,
    parentId,
}: {
    content: string;
    authorId: string;
    parentId: string;
}) => {
    const parentComment = await prisma.comment.findUniqueOrThrow({ where: { id: parentId } });

    return await createCommentService({
        content,
        authorId,
        ideaId: parentComment.ideaId,
        parentId,
    });
};

const updateCommentService = async (id: string, content: string) => {
    return await prisma.comment.update({
        where: { id },
        data: { content },
    });
};

const deleteCommentService = async (id: string) => {
    return await prisma.comment.delete({ where: { id } });
};

export const CommentService = {
    createCommentService,
    replyToCommentService,
    updateCommentService,
    deleteCommentService,
};
