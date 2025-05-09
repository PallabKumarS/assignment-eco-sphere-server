import { PaidIdeaPurchase } from '@prisma/client';
import prisma from '../../utils/prismaClient';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import paginationHelper from '../../utils/paginationHelper';
import { TMeta } from '../../utils/sendResponse';

// get all payments from db
const getAllPaymentFromDB = async (
  query: Record<string, unknown>,
  userId: string,
): Promise<{ data: PaidIdeaPurchase[]; meta: TMeta }> => {
  const options = paginationHelper(query);

  const result = await prisma.paidIdeaPurchase.findMany({
    where: {
      userId,
    },
    include: {
      idea: true,
      user: true,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const total = await prisma.paidIdeaPurchase.count();
  const totalPages = Math.ceil(total / options.limit);

  const meta = {
    page: options.page,
    limit: options.limit,
    totalPage: totalPages,
    totalData: total,
  };

  return {
    data: result,
    meta,
  };
};

// get single payment from db
const getSinglePaymentFromDB = async (
  id: string,
): Promise<PaidIdeaPurchase | null> => {
  const payment = await prisma.paidIdeaPurchase.findUnique({
    where: { id },
  });

  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const result = await prisma.paidIdeaPurchase.findUnique({
    where: { id },
    include: {
      idea: true,
      user: true,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return result;
};

// create payment
const createPaymentIntoDB = async (
  data: PaidIdeaPurchase,
): Promise<PaidIdeaPurchase> => {
  const result = await prisma.paidIdeaPurchase.create({
    data,
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create payment');
  }

  return result;
};

// verify payment
const verifyPaymentFromDB = async (
  paymentId: string,
): Promise<PaidIdeaPurchase | null> => {
  const payment = await prisma.paidIdeaPurchase.findUnique({
    where: { id: paymentId },
  });

  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const result = await prisma.paidIdeaPurchase.update({
    where: { id: paymentId },
    data: {
      userId: payment.userId,
    },
  });

  return result;
};

export const PaymentService = {
  getAllPaymentFromDB,
  getSinglePaymentFromDB,
  createPaymentIntoDB,
  verifyPaymentFromDB,
};
