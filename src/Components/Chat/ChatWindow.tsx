import React, { useState, ChangeEvent } from "react";

const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
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
        <div className="self-start p-2 bg-gray-700 rounded-lg max-w-xs">
          hello
        </div>
        <div className="self-end p-2 bg-blue-600 rounded-lg max-w-xs">
          yahhh
        </div>
        {/* Repeat chat bubbles */}
      </div>
      <div className="mt-auto flex items-center p-2 border-t border-gray-700">
        <input
          type="text"
          placeholder="Aa"
          value={message}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-800 text-gray-300 mr-2"
        />
        <button className="text-blue-500">👍</button>
      </div>
    </div>
  );
};

export default ChatWindow;
