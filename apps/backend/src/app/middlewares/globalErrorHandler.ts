/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import config from '../config';
import { ZodError } from 'zod';
import AppError from '../error/appError';
import handleJWTError from '../error/handleJWTError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleCastError from '../error/handleCastError';
import handleZodError from '../error/handleZodError';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessage = 'Something went wrong!';
  let errorDetails = err;
  let stack = config.NODE_ENV === 'development' ? err?.stack : null;

  if (err instanceof ZodError) {
    const getZodError = handleZodError(err);
    statusCode = getZodError?.statusCode;
    message = getZodError?.message;
    errorMessage = getZodError?.errorMessage;
  } else if (err?.name === 'CastError') {
    const gotCastError = handleCastError(err);
    statusCode = gotCastError?.statusCode;
    message = gotCastError?.message;
  } else if (err?.code === 11000) {
    const gotDuplicateError = handleDuplicateError(err);
    statusCode = gotDuplicateError?.statusCode;
    message = gotDuplicateError?.message;
    errorMessage = gotDuplicateError?.errorMessage;
  } else if (err instanceof JsonWebTokenError) {
    const gotJWTError = handleJWTError(err);
    statusCode = gotJWTError.statusCode;
    message = gotJWTError.message;
    errorMessage = gotJWTError.errorMessage;
    errorDetails = null;
    stack = null;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    errorMessage = err?.message;
  } else if (err instanceof Error) {
    errorMessage = err?.message;
  }

   res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack,
  });
};

export default globalErrorHandler;