"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleJWTError = (err) => {
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: 'Unauthorized Access.',
        errorMessage: 'You do not have the necessary permissions to access this resource.',
    };
};
exports.default = handleJWTError;
