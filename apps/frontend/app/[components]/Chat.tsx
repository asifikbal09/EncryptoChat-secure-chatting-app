'use client';

import { useEffect, useState } from 'react';
import { getSocket, initSocket } from './socket';


export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = initSocket();

    socket.on('message', (data: string) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = getSocket();
    if (message.trim()) {
      socket.emit('message', message);
      setMessages((prev) => [...prev, message]);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
