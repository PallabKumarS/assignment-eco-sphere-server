import { UserStatus } from '@prisma/client';
import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
});

const updateUserValidation = createUserValidation.partial();

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const UserValidation = {
  createUserValidation,
  updateUserValidation,
  updateStatusSchema,
};
