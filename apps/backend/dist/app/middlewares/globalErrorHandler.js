"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const appError_1 = __importDefault(require("../error/appError"));
const handleJWTError_1 = __importDefault(require("../error/handleJWTError"));
const handleDuplicateError_1 = __importDefault(require("../error/handleDuplicateError"));
const handleCastError_1 = __importDefault(require("../error/handleCastError"));
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessage = 'Something went wrong!';
    let errorDetails = err;
    let stack = config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null;
    if (err instanceof zod_1.ZodError) {
        const getZodError = (0, handleZodError_1.default)(err);
        statusCode = getZodError === null || getZodError === void 0 ? void 0 : getZodError.statusCode;
        message = getZodError === null || getZodError === void 0 ? void 0 : getZodError.message;
        errorMessage = getZodError === null || getZodError === void 0 ? void 0 : getZodError.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const gotCastError = (0, handleCastError_1.default)(err);
        statusCode = gotCastError === null || gotCastError === void 0 ? void 0 : gotCastError.statusCode;
        message = gotCastError === null || gotCastError === void 0 ? void 0 : gotCastError.message;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const gotDuplicateError = (0, handleDuplicateError_1.default)(err);
        statusCode = gotDuplicateError === null || gotDuplicateError === void 0 ? void 0 : gotDuplicateError.statusCode;
        message = gotDuplicateError === null || gotDuplicateError === void 0 ? void 0 : gotDuplicateError.message;
        errorMessage = gotDuplicateError === null || gotDuplicateError === void 0 ? void 0 : gotDuplicateError.errorMessage;
    }
    else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        const gotJWTError = (0, handleJWTError_1.default)(err);
        statusCode = gotJWTError.statusCode;
        message = gotJWTError.message;
        errorMessage = gotJWTError.errorMessage;
        errorDetails = null;
        stack = null;
    }
    else if (err instanceof appError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
    }
    else if (err instanceof Error) {
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack,
    });
};
exports.default = globalErrorHandler;
