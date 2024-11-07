import React, { useState } from "react";
import ChatList from "../../Components/Chat/ChatList";
import ChatWindow from "../../Components/Chat/ChatWindow";

const ChatPage: React.FC = () => {
  const [roomId, setRoomId] = useState<number | null>(null);

  return (
    <div className="pt-20 flex h-screen bg-gray-900 text-white">
      <ChatList onSelectChat={(roomId: number) => setRoomId(roomId)} />
      {roomId && <ChatWindow roomId={roomId} />}
    </div>
  );
};

export default ChatPage;
