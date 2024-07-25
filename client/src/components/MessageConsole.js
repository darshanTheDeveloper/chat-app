import React from "react";
import { useUser } from "./context/UserContext";
import {
  TextFiles,
  TextMessage,
  ImageFiles,
  PDFFiles,
  DocFiles,
  Zip,
  AudioFiles,
  VideoFiles,
} from "./MessageTypes";

export default function MessageConsole({ message }) {
  const { currentUser } = useUser();
  let alignment = "flex-start";
  let color = {
    backgroundColor: "white",
    color: "black",
  };
  if (currentUser.username === message.sender) {
    alignment = "flex-end";
    color = {
      backgroundColor: "#2196f3",
      color: "white",
    };
  }

  switch (message.type) {
    case "textMessage":
      return (
        <TextMessage
          textMessage={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    case "png":
    case "jpg":
    case "gif":
    case "jpeg":
      return (
        <ImageFiles
          src={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    case "txt":
      return (
        <TextFiles
          link={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    case "doc":
    case "docx":
      return (
        <DocFiles
          link={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    case "pdf":
      return (
        <PDFFiles
          link={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    case "zip":
      return (
        <Zip
          link={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    case "mp3":
      return (
        <AudioFiles
          src={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    case "mp4":
      return (
        <VideoFiles
          src={message.content}
          alignContent={alignment}
          message={message}
          color={color}
        />
      );
    default:
      return null;
  }
}

/*
  <>
      {currentUser.username === message.sender ? (
        <Box display={"flex"} justifyContent={"flex-end"} mr="1em" mt="0.5em">
          <Chip
            className="chat-bubble"
            label={
              <div>
                <p style={{ pStyle, textAlign: "start", fontSize: "1.1em" }}>
                  {message.content}
                </p>
                <p style={{ pStyle, textAlign: "end", fontSize: "0.9em" }}>
                  {new Date(message.timestamp).toLocaleTimeString("US-en", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            }
            sx={{
              height: "auto",
               minWidth: "100px",
              maxWidth: "400px",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
              p: "0",
              m: "0",
            }}
            color="primary"
            width={200}
            clickable
          />
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          ml="1em"
          mt="0.5em"
          className="msg"
        >
          <Chip
            className="chat-bubble"
            label={
              <div>
                <p style={{ pStyle, textAlign: "start", fontSize: "1.1em" }}>
                  {message.content}
                </p>
                <p style={{ pStyle, textAlign: "end", fontSize: "0.9em" }}>
                  {new Date(message.timestamp).toLocaleTimeString("US-en", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            }
            sx={{
              background: "white",
              height: "auto",
              maxWidth: "400px",
              minWidth: "100px",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
              p: "0",
              m: "0",
            }}
            width={200}
            clickable
          />
        </Box>
      )}
    </>
*/
