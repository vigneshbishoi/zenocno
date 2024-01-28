import socketio from "socket.io-client";
//import { SOCKET_URL } from "config";
import React from 'react';
import appConfig from '../../app/config/api-config';

export const socket = socketio.connect(appConfig.BASE_URL1);
export const SocketContext = React.createContext();

//emit events
const CONNECT = "connect"
const ADD_USER = "addUser"
const GET_CONVERSATIONS = "getConversations"
const DISCONNECT_USER = "disconnectUser"
const SEND_MESSAGE = "sendMessage"

//listeners events
const DISCONNECT = "disconnect"
const GET_ONLINE_USER = "getOnlineUser"
const CONVERSATIONS = "conversations"
const GET_MESSAGE = "getMessage"

//“msg_type”: 1, (type: 1- text, 2 - image, 3 - audio, 4 - video, 5 - other)
//“status”: 1, (optional)(Status: 0- sent, 1 - deliverd, 2 - seen)

export {
    CONNECT,
    ADD_USER,
    GET_CONVERSATIONS,
    DISCONNECT_USER,
    DISCONNECT,
    GET_ONLINE_USER,
    CONVERSATIONS,
    SEND_MESSAGE,
    GET_MESSAGE
}
