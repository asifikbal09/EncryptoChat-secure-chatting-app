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
exports.AuthServices = exports.loginUserFormDB = void 0;
const appError_1 = __importDefault(require("../../error/appError"));
const jwt_1 = require("../../utils/jwt");
const rsa_utils_1 = require("../../utils/rsa.utils");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRegisterIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield user_model_1.User.findOne({ email: payload.email });
    if (existing)
        throw new Error('Username already exists');
    const { publicKey, privateKey } = (0, rsa_utils_1.generateRSAKeyPair)();
    const newUser = yield user_model_1.User.create({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        publicKey,
        privateKey
    });
    const result = yield user_model_1.User.findById(newUser._id).select('-password -publicKey -privateKey');
    return result;
});
const loginUserFormDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user)
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    const isMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = (0, jwt_1.generateToken)({ id: user._id, email: user.email });
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            publicKey: user.publicKey,
        },
    };
});
exports.loginUserFormDB = loginUserFormDB;
exports.AuthServices = {
    userRegisterIntoDB,
    loginUserFormDB: exports.loginUserFormDB
};
