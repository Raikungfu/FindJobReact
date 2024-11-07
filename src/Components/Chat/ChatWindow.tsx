import React, { useState, useEffect, ChangeEvent } from "react";
import { API_GET_CHAT_ROOM } from "../../Service/UserAPI";
import { Message, Room } from "../../Types/chat";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

interface User {
  Id: number;
  Name: string;
  Avatar: string;
}

const ChatWindow: React.FC<{ roomId: number }> = ({ roomId }) => {
  const [Room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const user = JSON.parse(
    localStorage.getItem("User") || "{}"
  ) as unknown as User;
  const [connection, setConnection] = useState<any>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = (await API_GET_CHAT_ROOM(roomId)) as unknown as Room;
        if (response) {
          setRoom(response);
          console.log("Messages:", response.messages);
          setMessages(response.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Initialize SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7265/chatHub", {
        accessTokenFactory: () => {
          return localStorage.getItem("Token") || "";
        },
      })
      .build();

    // Start connection and handle JoinRoom
    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR Hub");
        newConnection
          .invoke("JoinRoom", roomId, user.Name)
          .then(() => {
            console.log("Successfully joined the room");
          })
          .catch((err) => {
            console.error("Error invoking 'JoinRoom':", err);
          });

        // Listen for incoming messages
        newConnection.on("ReceiveMessage", (message: Message) => {
          console.log("Received message: ", message);
          console.log("Received message: ", message.content);

          setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Listen for new user notifications
        newConnection.on("ReceiveNewUserNotification", (userName: string) => {
          console.log(`${userName} has joined the room!`);
        });
      })
      .catch((err: any) => {
        console.error("Connection failed: ", err);
      });

    setConnection(newConnection);
    fetchMessages();

    // Cleanup on component unmount
    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [roomId, user.Name]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (
      message.trim() &&
      connection &&
      connection.state === HubConnectionState.Connected
    ) {
      connection
        .invoke("SendMessageToRoom", roomId, message)
        .then(() => {
          setMessage("");
        })
        .catch((err: any) => console.error("Message sending failed: ", err));
    }
  };

  return (
    <div className="flex flex-col w-1/2 p-4 bg-gray-900 overflow-y-auto">
      <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
        <h2 className="font-bold">{Room?.Name}</h2>
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
              msg.FromUserId === user.Id
                ? "bg-blue-600 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            {msg.Content || msg.content}
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
