export type ConnectionStatus = 'pending' | 'accepted' | 'rejected';

export interface Connection {
  id: string;
  senderId: string;
  receiverId: string;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt: string;
  lastMessage?: string | null;
  lastMessageTime?: string | null;
}

export interface ConnectionWithProfile extends Connection {
  sender: {
    name: string;
    role: string;
    imageUrl: string;
  };
  receiver: {
    name: string;
    role: string;
    imageUrl: string;
  };
}