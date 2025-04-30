"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: 'Duplicate Entry',
        errorMessage: `${extractMessage} is already exists.`,
    };
};
exports.default = handleDuplicateError;
