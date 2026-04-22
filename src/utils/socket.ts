import { io } from 'socket.io-client';

const port = 3000;
const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('token')
  }
});