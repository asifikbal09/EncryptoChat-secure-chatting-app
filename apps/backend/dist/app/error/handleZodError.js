"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleZodError = (err) => {
    const statusCode = http_status_1.default.BAD_REQUEST;
    let errorMessage = '';
    const errorMessageArray = err.issues.map((issue) => {
        return {
            path: issue.path.at(-1),
            message: issue.message,
        };
    });
    errorMessageArray.forEach((message) => (errorMessage =
        errorMessage +
            `${message.path} is  ${message.message}. `.toLowerCase()));
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errorMessage,
    };
};
exports.default = handleZodError;
