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
  attachments: Json;
  reactions: Json;
  [key: string]: any;
}): Message {
  return {
    ...dbMessage,
    attachments: (dbMessage.attachments as any[] || []).map((att: any) => ({
      path: att.path || '',
      type: att.type || '',
      name: att.name || '',
    })),
    reactions: (dbMessage.reactions as Record<string, string[]>) || {},
  };
}