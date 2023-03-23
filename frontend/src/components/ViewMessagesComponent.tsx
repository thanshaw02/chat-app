import React from "react"; // not using this import, purely to remove the "'React' must be in scope when using JSX  react/react-in-jsx-scope" error
import { FC } from "react";
import {
  List,
  ListItem,
  ListItemText,
  // ListSubheader,
  Typography,
} from "@mui/material";
import ChatMessage from "../models/chatMessage";


type ViewMessagesProps = {
  chatMessages: Array<ChatMessage>;
};

const ViewMessagesComponent: FC<ViewMessagesProps> = ({
  chatMessages
}) => {

  return (
    <List>
      {chatMessages.map((m, index) => (
        <ListItem key={index}>
          <ListItemText primary={<Typography variant="subtitle2">{m.message}</Typography>}/>
        </ListItem>
      ))}
    </List>
  );
};

export default ViewMessagesComponent;