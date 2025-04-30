import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

// Define routes
router.get("/", CategoryController.getAllCategory);

export const CategoryRoutes = router;