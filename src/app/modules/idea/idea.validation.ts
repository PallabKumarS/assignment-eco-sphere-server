import { z } from "zod";

const createIdea = z.object({
    body: z.object({
        title: z.string(),
        problem: z.string(),
        solution: z.string(),
        description: z.string(),
        images: z.array(z.string()),
        isPaid: z.boolean().optional(),
        price: z.number().optional(),
        categories: z.array(z.string()).nonempty("At least one category is required"),
    }),
});

const updateIdea = z.object({
    body: z.object({
        title: z.string().optional(),
        problem: z.string().optional(),
        solution: z.string().optional(),
        description: z.string().optional(),
        images: z.array(z.string()).optional(),
        isPaid: z.boolean().optional(),
        price: z.number().optional(),
        categories: z.array(z.string()).optional(),
    }),
});

const updateIdeaStatus = z.object({
    body: z.object({
        status: z.enum(["DRAFT", "PENDING", "APPROVED", "UNDER_REVIEW", "REJECTED"]),
        feedback: z.string().optional(),
    }),
});

export const IdeaValidation = {
    createIdea,
    updateIdea,
    updateIdeaStatus
};
