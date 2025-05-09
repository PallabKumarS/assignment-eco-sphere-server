import { z } from 'zod';

const createPaymentValidation = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User id is required',
    }),
    ideaId: z.string({
      required_error: 'Idea id is required',
    }),
  }),
});

export const PaymentValidation = {
  createPaymentValidation,
};
