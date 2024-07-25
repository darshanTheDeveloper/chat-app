import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import "./styles.css";
import { socket } from "../socket";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import MessageConsole from "./MessageConsole";
import EmptyConversations from "./EmptyConversations";

export default function Messages({
  chatRoomId,
  from,
  to,
  selectedUser,
  avatar,
}) {
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef();

  useEffect(() => {
    socket.on("privateMessage", (msgs) => {
      setChatHistory(msgs);
    });
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  function onSend(message, originalName, messageType = "textMessage") {
    console.log(message, originalName, messageType);
    socket.emit("privateMessage", {
      roomId: chatRoomId,
      content: message,
      from: from,
      to: to,
      originalName: originalName,
      type: messageType,
    });
  }

  return (
    <div className="Messages">
      {selectedUser ? (
        <>
          <Box
            elevation="1"
            display={"flex"}
            gap={"1em"}
            p={"1em"}
            alignItems={"center"}
            sx={{
              borderLeft: "5px solid  rgb(239, 239, 239)",
              position: "sticky",
              left: "0",
              right: "0",
              top: "0",
              background: "white",
              boxShadow: "10px 2px 15px  #4E4E4E",
            }}
          >
            <Avatar src={avatar} />
            <Typography variant="subtitle1">{selectedUser}</Typography>
          </Box>
          {chatHistory.length ? (
            <Box
              ref={chatContainerRef}
              display="flex"
              gap={"1em"}
              padding={"1em"}
              flexDirection={"column"}
              overflow={"auto"}
              height={"79%"}
              sx={{
                background: "rgb(239, 239, 239)",
                scrollBehavior: "smooth",
              }}
            >
              {chatHistory.map((msg, index) => (
                <MessageConsole key={index} message={msg} />
              ))}
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="79%"
            >
              <Divider>No Message</Divider>
            </Box>
          )}

          <Input handleSend={onSend} roomId={chatRoomId} />
        </>
      ) : (
        <>
          <EmptyConversations />
        </>
      )}
    </div>
  );
}
