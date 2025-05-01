import { z } from "zod";
import { VoteType } from "@prisma/client";

const voteOnIdea = z.object({
    body: z.object({
        type: z.enum([VoteType.UPVOTE, VoteType.DOWNVOTE], {
        required_error: "Vote type is required",
        invalid_type_error: "Invalid vote type",
        }),
    }),
});

export const VoteValidation = {
  voteOnIdea,
};
