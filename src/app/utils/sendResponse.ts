import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response: any = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
  };

  if (data?.data) {
    response.data = data.data;
  }

  res.status(data?.statusCode).json(response);
};

export default sendResponse;
