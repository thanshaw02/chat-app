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

    const onSomeEvent = (foo: any) => {
      console.log(`Some event has happened: ${foo}`);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("some", onSomeEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("some", onSomeEvent);
    };
  }, []);

  return <>Under Construction</>;
};

export default App;
