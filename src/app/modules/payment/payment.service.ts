import { PaidIdeaPurchase } from '@prisma/client';
import prisma from '../../utils/prismaClient';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import paginationHelper from '../../utils/paginationHelper';
import { TMeta } from '../../utils/sendResponse';
import { makePaymentAsync, verifyPaymentAsync } from './payment.utils';
import config from '../../config';

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
  client_ip: string,
  data: PaidIdeaPurchase,
): Promise<PaidIdeaPurchase | null> => {
  const paymentData = await prisma.paidIdeaPurchase.create({
    data,
    include: {
      idea: true,
      user: true,
    },
  });

  if (!paymentData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create payment');
  }

  const shurjopayPayload = {
    amount: paymentData?.amount,
    order_id: paymentData.id,
    currency: 'BDT',
    customer_name: paymentData?.user.name,
    customer_address: paymentData?.user.address ?? 'N/A',
    customer_email: paymentData?.user.email,
    customer_phone: paymentData?.user?.contactNumber ?? 'N/A',
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await makePaymentAsync(shurjopayPayload);

  if (!payment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create payment');
  }

  let updatedPayment: PaidIdeaPurchase | null = null;

  if (payment.transactionStatus) {
    updatedPayment = await prisma.paidIdeaPurchase.update({
      where: { id: paymentData.id },
      data: {
        transactionStatus: payment.transactionStatus,
        paymentId: payment.sp_order_id,
        paymentUrl: payment.checkout_url,
      },
    });
  }

  return updatedPayment;
};

// verify payment
const verifyPaymentFromDB = async (
  paymentId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const paymentExists = await prisma.paidIdeaPurchase.findFirst({
    where: { paymentId: paymentId },
  });

  if (!paymentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  const payment = await verifyPaymentAsync(paymentId);

  let updatedPayment = null;

  if (payment[0].bank_status === 'Success') {
    updatedPayment = await prisma.paidIdeaPurchase.update({
      where: { id: paymentExists.id },
      data: {
        transactionStatus:
          payment[0].bank_status == 'Success'
            ? 'PAID'
            : payment[0].bank_status == 'Failed'
              ? 'PENDING'
              : payment[0].bank_status == 'Cancel'
                ? 'CANCELLED'
                : 'PENDING',
        paymentUrl: `${config.sp_return_url}/?order_id=${paymentId}`,
      },
      include: {
        idea: true,
        user: true,
      },
    });

    if (!updatedPayment) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update payment');
    }
  }

  return payment[0];
};

//   {
//     id: 97708,
//     order_id: 'eco_sphere681df773d4038',
//     currency: 'BDT',
//     amount: 49.99,
//     payable_amount: 49.99,
//     discsount_amount: null,
//     disc_percent: 0,
//     received_amount: '49.9900',
//     usd_amt: 0,
//     usd_rate: 0,
//     is_verify: 0,
//     card_holder_name: null,
//     card_number: 'accoxxxxxxxx',
//     phone_no: 'N/A',
//     bank_trx_id: '681df77e',
//     invoice_no: 'eco_sphere681df773d4038',
//     bank_status: 'Success',
//     customer_order_id: '7a3ad7b9-642a-4873-8041-59c1b67790b5',
//     sp_code: '1000',
//     sp_message: 'Success',
//     name: 'Pallab Kumar Sarker',
//     email: 'pallabkumar2699@gmail.com',
//     address: 'N/A',
//     city: 'N/A',
//     value1: null,
//     value2: null,
//     value3: null,
//     value4: null,
//     transaction_status: null,
//     method: 'iBanking',
//     date_time: '2025-05-09 18:39:26',
//   },
// ];

export const PaymentService = {
  getAllPaymentFromDB,
  getSinglePaymentFromDB,
  createPaymentIntoDB,
  verifyPaymentFromDB,
};
