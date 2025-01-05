import { Json } from "@/integrations/supabase/types";

export interface Attachment {
  path: string;
  type: string;
  name: string;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  connection_id: string;
  created_at: string;
  updated_at: string;
  read_status: boolean;
  delivered_at: string | null;
  edited_at: string | null;
  is_edited: boolean;
  parent_message_id: string | null;
  reactions: Record<string, string[]>;
  attachments: Attachment[];
}

export function parseMessage(dbMessage: {
  id: string;
  content: string;
  sender_id: string;
  connection_id: string;
  created_at: string;
  updated_at: string;
  read_status: boolean;
  delivered_at: string | null;
  edited_at: string | null;
  is_edited: boolean;
  parent_message_id: string | null;
  attachments: Json;
  reactions: Json;
}): Message {
  return {
    id: dbMessage.id,
    content: dbMessage.content,
    sender_id: dbMessage.sender_id,
    connection_id: dbMessage.connection_id,
    created_at: dbMessage.created_at,
    updated_at: dbMessage.updated_at,
    read_status: dbMessage.read_status,
    delivered_at: dbMessage.delivered_at,
    edited_at: dbMessage.edited_at,
    is_edited: dbMessage.is_edited,
    parent_message_id: dbMessage.parent_message_id,
    attachments: (dbMessage.attachments as any[] || []).map((att: any) => ({
      path: att.path || '',
      type: att.type || '',
      name: att.name || '',
    })),
    reactions: (dbMessage.reactions as Record<string, string[]>) || {},
  };
}