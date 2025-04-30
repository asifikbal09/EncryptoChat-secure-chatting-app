import catchAsync from '../../utils/catchAsync';
import { generateRSAKeyPair } from '../../utils/rsa.utils';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

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

export const AuthServices ={
    userRegisterIntoDB
}