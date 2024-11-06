import React from "react";

import ChatList from "../../Components/Chat/ChatList";
import ChatWindow from "../../Components/Chat/ChatWindow";
import UserInfo from "../../Components/User/UserInfo";
const ChatPage: React.FC = () => {
  return (
    <div className="pt-20 flex h-screen bg-gray-900 text-white">
      <ChatList />
      <ChatWindow />
      <UserInfo />
    </div>
  );
};

export default ChatPage;
