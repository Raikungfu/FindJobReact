import React from "react";

interface ChatListItem {
  id: number;
  name: string;
  lastMessage: string;
}

const chatItems: ChatListItem[] = [
  { id: 1, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 2, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 3, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 4, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 5, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 6, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 7, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 8, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 9, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 10, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 11, name: "Tuấn Hào", lastMessage: "yahhhh" },
  { id: 12, name: "Tuấn Hào", lastMessage: "yahhhh" },
];

const ChatList: React.FC = () => {
  return (
    <div className="w-1/4 p-4 bg-gray-800 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Đoạn chat</h2>
      <input
        type="text"
        placeholder="Tìm kiếm trên Jobby"
        className="w-full p-2 rounded bg-gray-700 text-gray-300 mb-4"
      />
      <div className="space-y-2">
        {chatItems.map((item) => (
          <div
            key={item.id}
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
