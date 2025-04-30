import { Model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    publicKey: string;
    privateKey: string;
  }
  

  export interface UserModel extends Model<IUser> {
    isPasswordMatched(
      planeTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
  }