import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserRole } from '@prisma/client';

const router = Router();

// Define routes
router.get('/', auth(UserRole.ADMIN), UserController.getAllUser);

router.get('/me', auth(UserRole.ADMIN, UserRole.MEMBER), UserController.getMe);

router.get('/:id', UserController.getUserById);

router.get(
  '/:id/ideas',
  auth(UserRole.ADMIN, UserRole.MEMBER),
  UserController.getIdeasByUser,
);
router.get(
  '/:id/purchases',
  auth(UserRole.ADMIN, UserRole.MEMBER),
  UserController.getPurchasesByUser,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.MEMBER),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUserById,
);

router.delete('/:id', auth(UserRole.ADMIN), UserController.deleteUserById);

router.patch(
  '/:id/status',
  auth(UserRole.ADMIN),
  validateRequest(UserValidation.updateStatusSchema),
  UserController.updateProfileStatus,
);

export const UserRoutes = router;
