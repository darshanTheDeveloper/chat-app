import React from "react";
import { Avatar, Divider } from "@mui/material";
import getRoomId from "./chatrooms/getRoomId";
import { socket } from "../socket";

export default function Conversations({
  name,
  username,
  currentUser,
  createConversation,
  avatar
}) {
  function getUser() {
    const roomid = getRoomId(username, currentUser);
    socket.emit("joinRoom", { roomId: roomid, currentUserId: currentUser });
    createConversation(roomid, currentUser, username,name,avatar);
  }

  return (
    <>
      <Divider />
      <div className="user" onClick={getUser}>
        <Avatar src={avatar}/>
        <p>{name}</p>
      </div>
    </>
  );
}
