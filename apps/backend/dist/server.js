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
exports.io = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// let server: Server;
const httpServer = (0, http_1.createServer)(app_1.default);
// Initialize Socket.IO
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*', // Allow all origins for now (customize in production)
    },
});
exports.io.on('connection', (socket) => {
    console.log('🟢 New client connected:', socket.id);
    socket.on('message', ({ to, encrypted }) => {
        exports.io.to(to).emit('message', { encrypted, from: socket.id });
    });
    socket.on('disconnect', () => {
        console.log('🔴 Client disconnected:', socket.id);
    });
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            httpServer.listen(config_1.default.port, () => console.log(`🚀 Server running on port ${config_1.default.port}`));
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
// process.on('unhandledRejection', () => {
//   console.log(`Unhandled Rejection denoted. server is shuting down...`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });
// process.on('uncaughtException', () => {
//   process.exit(1);
// });
