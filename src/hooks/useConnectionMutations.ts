import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useConnectionMutations = () => {
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', connectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
      queryClient.invalidateQueries({ queryKey: ['connections'] });
      toast.success("Connection request accepted!");
    },
    onError: () => {
      toast.error("Failed to accept connection request");
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (connectionId: string) => {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'rejected' })
        .eq('id', connectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
      toast.success("Connection request rejected");
    },
    onError: () => {
      toast.error("Failed to reject connection request");
    }
  });

  const createConnection = useMutation({
    mutationFn: async (founderId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('connections')
        .insert({
          sender_id: user.id,
          receiver_id: founderId,
          status: 'pending'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Connection request sent!");
    },
    onError: () => {
      toast.error("Failed to send connection request");
    }
  });

  return {
    acceptConnection: (id: string) => acceptMutation.mutateAsync(id),
    rejectConnection: (id: string) => rejectMutation.mutateAsync(id),
    createConnection: (founderId: string) => createConnection.mutateAsync(founderId)
  };
};