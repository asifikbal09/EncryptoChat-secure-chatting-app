import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { createServer } from 'http';
import { Server } from 'socket.io';


// let server: Server;
const httpServer = createServer(app);

// Initialize Socket.IO
export const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow all origins for now (customize in production)
  },
});


io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);
  socket.on('message', ({ to, encrypted }) => {
    io.to(to).emit('message', { encrypted, from: socket.id });
  });
  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    
    httpServer.listen(config.port, () =>
      console.log(`🚀 Server running on port ${config.port}`))
    
  } catch (err) {
    console.log(err);
  }
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