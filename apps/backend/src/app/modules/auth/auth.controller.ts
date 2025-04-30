import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import HttpStatus from 'http-status';

const userRegister = catchAsync(async (req, res) => {
  const result = await AuthServices.userRegisterIntoDB(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const AuthController = {
  userRegister,
};
