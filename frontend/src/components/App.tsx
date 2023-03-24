import React from "react"; // not using this import, purely to remove the "'React' must be in scope when using JSX  react/react-in-jsx-scope" error
import { FC, FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import socket from "../socket";
import ChatMessage from "../models/chatMessage";
import ViewMessagesComponent from "./ViewMessagesComponent";

const App: FC<unknown> = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [clientId, setClientId] = useState<string>("");

  useEffect(() => {
    const onConnect = () => {
      console.log("Client has connected...");
    };

    const onDisconnect = () => {
      console.log("Client has disconnected...");
    };

    const onNewChat = (message: ChatMessage) => {
      console.log(`A user has sent a message: ${JSON.stringify(message)}`);
      setMessages((oldMessages) => [...oldMessages, message]);
    };

    const onCurrentId = (id: string) => {
      console.log(`Client ID: ${id}`);
      setClientId(id);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new-chat", onNewChat);
    socket.on("current-id", onCurrentId);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new-chat", onNewChat);
      socket.off("current-id", onCurrentId);
    };
  }, []);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const chatMessage = formData.get("chat-message");
    if (!chatMessage) {
      console.warn("You must type a message in");
      return;
    }

    const newMessage: ChatMessage = {
      id: clientId,
      message: chatMessage.toString()
    };
    setMessages((oldMessages) => [...oldMessages, newMessage]);

    socket.emit("new-chat", newMessage);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSendMessage}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { md: 10 },
      }}
    >
      <Paper elevation={9} sx={{ px: 4, pt: 4, pb: 2 }}>
        <Grid justifyContent="center" alignItems="center">
          {/* Header */}
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              Let&apos;s Chat!
            </Typography>
          </Grid>
          
          <Divider />

          {/* Displaying messages */}
          <Grid item xs={12}>
            <ViewMessagesComponent clientId={clientId} chatMessages={messages}/>
          </Grid>
          
          <Divider />

          {/* Type your message and send it */}
          <Grid item xs={12}>
            <TextField
              name="chat-message"
              size="small"
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              variant="outlined" 
              sx={{ ml: 2, mt: 2.25 }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default App;
