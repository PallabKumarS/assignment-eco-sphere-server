import { Router } from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Define routes
router.get('/', CategoryController.getAllCategory);

router.get('/:id', auth(UserRole.ADMIN), CategoryController.getSingleCategory);

router.post(
  '/',
  auth(UserRole.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryController.createCategory,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(CategoryValidation.updateCategoryValidation),
  CategoryController.updateCategory,
);

router.delete('/:id', auth(UserRole.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;
