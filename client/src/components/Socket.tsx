import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVERURL as string); 

export default socket;