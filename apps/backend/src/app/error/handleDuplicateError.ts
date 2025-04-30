/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TGenericErrorResponse } from '../types/error';


const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractMessage = match && match[1];
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Duplicate Entry',
    errorMessage: `${extractMessage} is already exists.`,
  };
};

export default handleDuplicateError;