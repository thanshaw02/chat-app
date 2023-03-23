import React from "react"; // not using this import, purely to remove the "'React' must be in scope when using JSX  react/react-in-jsx-scope" error
import { FC, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import socket from "../socket";
import ChatMessage from "../models/chatMessage";
import ViewMessagesComponent from "./ViewMessagesComponent";

const App: FC<unknown> = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);

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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { md: 10 },
      }}
    >
      <Paper elevation={9} sx={{ px: 4, pt: 4, pb: 2 }}>
        <ViewMessagesComponent chatMessages={messages}/>
        <TextField
          size="small"
        />
        <Button variant="outlined" sx={{ ml: 2, mt: 0.25 }}>
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default App;
