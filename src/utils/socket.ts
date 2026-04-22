import { io } from 'socket.io-client';

const port = 3000;
const URL = `http://${import.meta.env.VITE_IPV4}:${port}` || `http://localhost:${port}`;

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('token')
  }
});