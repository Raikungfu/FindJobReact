export interface Room {
  Id: number;
  Name: string;
  UserId1: number;
  UserId2: number;
  Messages: Message[];
  messages: Message[];
}

export interface Message {
  MessageId?: number;
  Content?: string;
  Type?: string;
  File?: string;
  FromUserId?: number;
  ToRoomId?: number;
  Timestamp?: Date;
  content?: string;
  timestamp?: string;
}

export interface MessageReceived {
  content: string;
  fromName: number;
  id: number;
  room: number;
  timestamp: Date;
}
