"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    saltRound: process.env.SALT_ROUND,
    database_url: process.env.DATABASE_URL,
    access_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    access_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN
};
