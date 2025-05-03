import { UserRole, UserStatus } from '@prisma/client';
import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email address',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email address',
      })
      .optional(),
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED]).optional(),
    role: z.enum(['ADMIN', 'MEMBER']).optional(),
  }),
});

const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

const updateRoleSchema = z.object({
  body: z.object({
    role: z.enum([UserRole.ADMIN, UserRole.MEMBER]),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateStatusSchema,
  updateRoleSchema,
};
