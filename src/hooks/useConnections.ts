import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ConnectionWithProfile } from "@/types/connection";

export const useConnections = () => {
  return useQuery({
    queryKey: ['connections'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('connections')
        .select(`
          id,
          sender_id,
          receiver_id,
          status,
          created_at,
          updated_at,
          last_message,
          last_message_time,
          sender:profiles!connections_sender_id_fkey (
            name:full_name,
            role,
            imageUrl:image_url
          ),
          receiver:profiles!connections_receiver_id_fkey (
            name:full_name,
            role,
            imageUrl:image_url
          )
        `)
        .eq('status', 'accepted')
        .or(`sender_id.eq.${user.user.id},receiver_id.eq.${user.user.id}`);

      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        senderId: item.sender_id,
        receiverId: item.receiver_id,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        lastMessage: item.last_message,
        lastMessageTime: item.last_message_time,
        sender: {
          name: item.sender.name,
          role: item.sender.role,
          imageUrl: item.sender.imageUrl,
        },
        receiver: {
          name: item.receiver.name,
          role: item.receiver.role,
          imageUrl: item.receiver.imageUrl,
        }
      })) as ConnectionWithProfile[];
    },
  });
};