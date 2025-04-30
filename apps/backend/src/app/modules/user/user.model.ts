import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt"
import config from '../../config';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true, // Store hashed password only
    },

    publicKey: {
      type: String,
      required: true, // RSA public key
    },
    privateKey:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const password = this.password;
    const hashedPassword = await bcrypt.hash(password, Number(config.saltRound));
    this.password = hashedPassword;
  
    next();
  });
  
  userSchema.statics.isPasswordMatched = async function (
    planeTextPassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(planeTextPassword, hashedPassword);
  };


export const User = model<IUser>('User', userSchema);
