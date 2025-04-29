import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});

const updateUserValidation = createUserValidation.partial();

export const UserValidation = {
  createUserValidation,
  updateUserValidation,
};