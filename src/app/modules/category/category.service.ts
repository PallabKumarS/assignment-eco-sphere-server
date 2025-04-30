import { Category } from '@prisma/client';
import { AppError } from '../../errors/AppError';
import prisma from '../../utils/prismaClient';
import httpStatus from 'http-status';

// get all categories from db
const getAllCategoryFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

// get single category from db
const getSingleCategoryFromDB = async (id: string): Promise<Category> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return result;
};

// create category in db (admin)
const createCategoryInDB = async (data: {
  name: string;
}): Promise<Category> => {
  console.log(data);

  const result = await prisma.category.create({
    data,
  });

  return result;
};

// update category in db (admin)
const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<Category>,
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

// delete category from db (admin)
const deleteCategoryFromDB = async (id: string): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    // Find all ideas related to this category
    const relatedIdeas = await tx.idea.findMany({
      where: {
        categories: {
          some: { id },
        },
      },
      select: { id: true },
    });

    // deleting the category from each idea
    for (const idea of relatedIdeas) {
      await tx.idea.update({
        where: { id: idea.id },
        data: {
          categories: {
            disconnect: { id },
          },
        },
      });
    }

    // deleting the category
    await tx.category.delete({
      where: { id },
    });
  });
};

export const CategoryService = {
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  createCategoryInDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
