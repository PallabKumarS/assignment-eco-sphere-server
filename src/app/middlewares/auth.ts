import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import {
  isJWTIssuedBeforePasswordChanged,
  verifyToken,
} from '../modules/auth/auth.utils';
import prisma, { TUserRole } from '../utils/prismaClient';

const auth = (
  ...requiredRoles: TUserRole[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = verifyToken(token, config.jwt_access_secret as string);
    const { role, email, iat } = decoded;

    // checking if the user is exist
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is active
    if (user.status !== 'ACTIVE') {
      throw new AppError(httpStatus.FORBIDDEN, 'Your account is deactivated !');
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the password is changed after the jwt was issued
    if (
      user.passwordChangedAt &&
      isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
