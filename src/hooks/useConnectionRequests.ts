import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ConnectionWithProfile } from "@/types/connection";

export const useConnectionRequests = () => {
  return useQuery({
    queryKey: ['connectionRequests'],
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
        .eq('receiver_id', user.user.id)
        .eq('status', 'pending');

      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        senderId: item.sender_id,
        receiverId: item.receiver_id,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
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