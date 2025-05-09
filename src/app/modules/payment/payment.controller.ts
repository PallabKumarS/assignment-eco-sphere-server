import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// get all payments
const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  const data = await PaymentService.getAllPaymentFromDB(req.query, req.user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payments retrieved successfully',
    data: data.data,
    meta: data.meta,
  });
});

// get single payment
const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getSinglePaymentFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment retrieved successfully',
    data: result,
  });
});

// create payment
const createPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.createPaymentIntoDB(req.ip!, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment created successfully',
    data: result,
  });
});

// verify payment
const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.verifyPaymentFromDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment verified successfully',
    data: result,
  });
});

export const PaymentController = {
  getAllPayment,
  getSinglePayment,
  createPayment,
  verifyPayment,
};
