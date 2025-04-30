import AppError from '../../error/appError';
import catchAsync from '../../utils/catchAsync';
import { generateToken } from '../../utils/jwt';
import { generateRSAKeyPair } from '../../utils/rsa.utils';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt'

const userRegisterIntoDB = async (payload: IUser) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw new Error('Username already exists');

  const { publicKey, privateKey } = generateRSAKeyPair();
  const newUser = await User.create({
    name:payload.name,
    email:payload.email,
    password:payload.password,
    publicKey,
    privateKey
  });
  const result = await User.findById(newUser._id).select('-password -publicKey -privateKey');
  return result
};

export const loginUserFormDB = async (payload:{email:string,password:string}) => {
  const user = await User.findOne({ email:payload.email });
  if (!user) throw new AppError(httpStatus.NOT_FOUND,'User not found');

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken({ id: user._id, email: user.email });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      publicKey: user.publicKey,
    },
  };
};


export const AuthServices ={
    userRegisterIntoDB,
    loginUserFormDB
}