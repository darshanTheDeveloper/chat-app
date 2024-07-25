import { useState } from "react";
import "../App.css";
import Chats from "../components/Chats";
import Icons from "../components/Icons";
import Messages from "../components/Messages";
import useConversations from "../hooks/useConversations";

export default function Main() {
  const [users] = useConversations();
  const [roomId, setRoomId] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [avatar, setAvatar] = useState("");

  function createConversation(id, sender, receiver, receiverName, avatar) {
    setRoomId(id);
    setSender(sender);
    setReceiver(receiver);
    setSelectedUser(receiverName);
    setAvatar(avatar);
  }

  return (
      <div className="Main">
        <Icons />
        <Chats usersData={users} startConversation={createConversation} />
        <Messages
          chatRoomId={roomId}
          from={sender}
          to={receiver}
          selectedUser={selectedUser}
          avatar={avatar}
        />
      </div>
  );
}
