import React, { useState, useEffect } from "react";
import { API_GET_CHATS } from "../../Service/UserAPI";

interface ChatListItem {
  id: number;
  name: string;
  lastMessage: string;
}

const ChatList: React.FC<{ onSelectChat: (roomId: number) => void }> = ({
  onSelectChat,
}) => {
  const [chats, setChats] = useState<ChatListItem[]>([]);

  useEffect(() => {
    API_GET_CHATS<any[]>()
      .then((data) => {
        const chatList = data.map((chat: any) => ({
          id: chat.roomId,
          name: chat.withUser || "Unknown User",
          lastMessage: chat.lastMessage || "",
        }));
        setChats(chatList);
      })
      .catch(console.error);
  }, []);
  console.log(chats);
  return (
    <div className="w-1/4 p-4 bg-gray-800 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Đoạn chat</h2>
      <input
        type="text"
        placeholder="Tìm kiếm trên Jobby"
        className="w-full p-2 rounded bg-gray-700 text-gray-300 mb-4"
      />
      <div className="space-y-2">
        {chats.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectChat(item.id)}
            className="flex items-center p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <div className="ml-2">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-400">{item.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
