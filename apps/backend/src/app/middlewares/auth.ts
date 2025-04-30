import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import config from "../config"
import { NextFunction, Request, Response } from 'express';
import AppError from '../error/appError';
import catchAsync from '../utils/catchAsync';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(" ").slice(-1) as string[];
    
    if (!token[0]) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const decoded = jwt.verify(
      token[0],
      config.access_secret as string,
    ) as JwtPayload;

    const { role, _id, iat } = decoded;

    const user =1 //await User.findById(_id);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;