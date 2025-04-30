import { Router } from "express";
import { IdeaController } from "./idea.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { IdeaValidation } from "./idea.validation";
import { UserRole } from "@prisma/client";

const router = Router();

// Define routes
router.post(
  "/",
  // auth(UserRole.MEMBER),
  validateRequest(IdeaValidation.createIdea),
  IdeaController.createIdea
);

router.get(
  "/",
  auth(UserRole.ADMIN,UserRole.MEMBER),
  IdeaController.getAllIdeas
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.MEMBER),
  IdeaController.getIdeaById
);

router.patch(
  "/:id",
  auth(UserRole.MEMBER),
  validateRequest(IdeaValidation.updateIdea),
  IdeaController.updateIdea
);

router.delete(
  "/:id",
  auth(UserRole.MEMBER, UserRole.ADMIN),
  IdeaController.deleteIdea
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN),
  validateRequest(IdeaValidation.updateIdeaStatus),
  IdeaController.changeIdeaStatus
);

router.get(
  "/:id/comments",
  auth(UserRole.ADMIN, UserRole.MEMBER),
  IdeaController.getIdeaComments
);

router.get(
  "/:id/votes",
  auth(UserRole.ADMIN, UserRole.MEMBER),
  IdeaController.getIdeaVotes
);

export const IdeaRoutes = router;
