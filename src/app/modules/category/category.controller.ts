import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.getAllCategoryFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categorys retrieved successfully",
    data,
  });
});

export const CategoryController = { getAllCategory };