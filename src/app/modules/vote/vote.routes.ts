import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { VoteController } from "./vote.controller";
import { VoteValidation } from "./vote.validation";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
    "/:id/vote",
    auth(UserRole.MEMBER),
    validateRequest(VoteValidation.voteOnIdea),
    VoteController.voteOnIdea
);

router.delete(
    "/:id/vote",
    auth(UserRole.MEMBER),
    VoteController.removeVote
);

export const VoteRoutes = router;
