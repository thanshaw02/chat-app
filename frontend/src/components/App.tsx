import React from "react"; // not using this import, purely to remove the "'React' must be in scope when using JSX  react/react-in-jsx-scope" error
import { FC, useEffect } from "react";
import socket from "../socket";

const App: FC<unknown> = () => {
  useEffect(() => {
    const onConnect = () => {
      console.log("Client has connected...");
    };

    const onDisconnect = () => {
      console.log("Client has disconnected...");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return <></>;
};

export default App;
