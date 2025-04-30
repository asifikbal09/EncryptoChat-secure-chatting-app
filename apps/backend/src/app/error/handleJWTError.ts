/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { JsonWebTokenError } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { TGenericErrorResponse } from '../types/error';

const handleJWTError = (err: JsonWebTokenError): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Unauthorized Access.',
    errorMessage:
      'You do not have the necessary permissions to access this resource.',
  };
};

export default handleJWTError;
