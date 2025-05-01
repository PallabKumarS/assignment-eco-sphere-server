import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>): void => {
  const response: TResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data ?? null,
  };

  res.status(data?.statusCode).json(response);
};

export default sendResponse;
