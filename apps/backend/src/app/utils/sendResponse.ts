import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    token?: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data?: T | null | undefined;
  },
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    statusCode: jsonData.statusCode,
    message: jsonData.message,
    token: jsonData.token,
    meta: jsonData.meta || null || undefined,
    data: jsonData.data || null || undefined,
  });
};

export default sendResponse;