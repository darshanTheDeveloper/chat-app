import "./styles.css";
import React from "react";
import Search from "./Search";
import Conversations from "./Conversations";
import { useUser } from "./context/UserContext";

export default function Chats({ usersData, startConversation }) {
  const { currentUser } = useUser();
  function createConversation(id, sender, receiver,selectedUser,avatar) {
    startConversation(id, sender, receiver,selectedUser,avatar);
  }

  return (
    <div className="Chats">
      <h1 style={{ marginLeft: "0.5em" }}>Chats</h1>
      <Search />
      <div className="conversations">
        {usersData.map((user, index) => (
          <Conversations
            key={index}
            name={`${user.firstName} ${user.lastName}`}
            username={user.username}
            currentUser={currentUser.username}
            createConversation={createConversation}
            avatar = {user.img}
          />
        ))}
      </div>
    </div>
  );
}
