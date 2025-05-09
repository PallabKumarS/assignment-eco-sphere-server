import { Router } from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Define routes
router.get('/', auth(UserRole.MEMBER), PaymentController.getAllPayment);

router.get('/:id', auth(UserRole.MEMBER), PaymentController.getSinglePayment);

router.post('/', auth(UserRole.MEMBER), PaymentController.createPayment);

router.post(
  '/:id/verify',
  auth(UserRole.MEMBER),
  PaymentController.verifyPayment,
);

export const PaymentRoutes = router;
