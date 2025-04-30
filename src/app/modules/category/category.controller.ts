import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all categories controller
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.getAllCategoryFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data,
  });
});

// get single category controller
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await CategoryService.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data,
  });
});

// create category controller (admin)
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryData } = req.body;

  const data = await CategoryService.createCategoryInDB(categoryData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data,
  });
});

// update category controller (admin)
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryData } = req.body;

  const data = await CategoryService.updateCategoryIntoDB(id, categoryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await CategoryService.deleteCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: null,
  });
});

export const CategoryController = {
  getAllCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
