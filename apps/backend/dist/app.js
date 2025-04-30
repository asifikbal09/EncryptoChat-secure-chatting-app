"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const sendResponse_1 = __importDefault(require("./app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", router_1.default);
app.get('/', (req, res) => {
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Hello world."
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
