import { z } from "zod";

const createCategoryValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});

const updateCategoryValidation = createCategoryValidation.partial();

export const CategoryValidation = {
  createCategoryValidation,
  updateCategoryValidation,
};