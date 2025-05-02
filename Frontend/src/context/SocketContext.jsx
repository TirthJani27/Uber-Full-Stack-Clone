import React, { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SOCKET_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }, []);

  const sendMessage = (eventName, data) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, data);
    }
  };

  const onMessage = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
      return () => socketRef.current.off(eventName, callback);
    }
    return () => {};
  };

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, sendMessage, onMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
