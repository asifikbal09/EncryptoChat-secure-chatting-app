import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocket = () => {
  socket = io('http://localhost:5000'); // change port if needed
  console.log('🔌 Connecting socket...');
  
  socket.on('connect', () => {
    console.log('✅ Connected to socket server');
  });

  return socket;
};

export const getSocket = () => socket;
