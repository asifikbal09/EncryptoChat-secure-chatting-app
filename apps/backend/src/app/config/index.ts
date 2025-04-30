import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  saltRound:process.env.SALT_ROUND,
  database_url: process.env.DATABASE_URL,
  access_secret:process.env.JWT_ACCESS_TOKEN_SECRET,
  access_expires_in:process.env.JWT_ACCESS_TOKEN_EXPIRE_IN
};