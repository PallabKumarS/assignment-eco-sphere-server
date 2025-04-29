/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

import config from '../config';
import { AppError } from '../errors/AppError';
import { PrismaClientKnownRequestError } from '../../../prisma/generated/client/runtime/library';
import httpStatus from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';

  // custom error here
  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
  }

  // default error here
  else if (err instanceof Error) {
    // prisma  errors here
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          if (Array.isArray(err.meta?.target)) {
            statusCode = httpStatus.CONFLICT;
            message = `A field with the same ${err.meta.target.join(', ')} already exists.`;
          }
          break;

        case 'P2003':
          statusCode = httpStatus.BAD_REQUEST;
          message = `Invalid relation reference. Related record for ${err.meta?.field_name || 'a field'} does not exist.`;
          break;

        case 'P2000':
          statusCode = httpStatus.BAD_REQUEST;
          message = `Value is too long for field ${err.meta?.column_name || 'unknown'}.`;
          break;

        case 'P2025':
          statusCode = httpStatus.NOT_FOUND;
          message = `The record you are trying to update/delete does not exist.`;
          break;

        case 'P2011':
          statusCode = httpStatus.BAD_REQUEST;
          message = `Field ${err.meta?.constraint || 'unknown'} cannot be null.`;
          break;

        case 'P2012':
          statusCode = httpStatus.BAD_REQUEST;
          message = `Missing required field ${err.meta?.field_name || 'unknown'}.`;
          break;

        case 'P2014':
          statusCode = httpStatus.BAD_REQUEST;
          message = `Required related record not found.`;
          break;

        case 'P2015':
          statusCode = httpStatus.NOT_FOUND;
          message = `Related record not found.`;
          break;

        case 'P2024':
          statusCode = httpStatus.SERVICE_UNAVAILABLE;
          message = `Database timeout. Please try again later.`;
          break;

        default:
          statusCode = httpStatus.INTERNAL_SERVER_ERROR;
          message = `A database error occurred: ${err.message}`;
          break;
      }
    } else {
      statusCode = 500;
      message = err.message;
    }
  } else if (err instanceof SyntaxError) {
    statusCode = 400;
    message = 'Invalid JSON payload passed.';
  }

  //ultimate return
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
