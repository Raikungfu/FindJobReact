import React, { useState, useEffect, ChangeEvent } from "react";
import { API_GET_CHAT_ROOM } from "../../Service/UserAPI";

const ChatWindow: React.FC<{ roomId: number }> = ({ roomId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (roomId) {
      API_GET_CHAT_ROOM<any[]>(roomId)
        .then((data) => setMessages(data.Messages || []))
        .catch(console.error);
    }
  }, [roomId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Simulate sending a message by adding it to the messages list
    setMessages([...messages, { content: message, sender: "me" }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col w-1/2 p-4 bg-gray-900 overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
        <h2 className="font-bold">Tuấn Hào</h2>
        <div className="space-x-3 text-purple-500">
          <span>📞</span>
          <span>🎥</span>
          <span>⋮</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "me"
                ? "bg-blue-600 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center p-2 border-t border-gray-700">
        <input
          type="text"
          placeholder="Aa"
          value={message}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-800 text-gray-300 mr-2"
        />
        <button onClick={handleSendMessage} className="text-blue-500">
          👍
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
