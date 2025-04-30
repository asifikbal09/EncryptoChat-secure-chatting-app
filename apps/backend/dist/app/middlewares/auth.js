"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const appError_1 = __importDefault(require("../error/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const bearerToken = req.headers.authorization;
        const token = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(" ").slice(-1);
        if (!token[0]) {
            throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        const decoded = jsonwebtoken_1.default.verify(token[0], config_1.default.access_secret);
        const { role, _id, iat } = decoded;
        const user = 1; //await User.findById(_id);
        if (!user) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
