/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../utils/prismaClient';

// get all categories from db
const getAllCategoryFromDB = async (): Promise<any> => {
  const result = await prisma.category.findMany();
  return result;
};

// get single category from db
const getSingleCategoryFromDB = async (id: string): Promise<any> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
}; 

export const CategoryService = {
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
};
