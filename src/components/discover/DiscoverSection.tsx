import { FounderCard } from "@/components/FounderCard";
import { FilterSection } from "@/components/FilterSection";
import { useConnectionMutations } from "@/hooks/useConnectionMutations";
import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { toast } from "sonner";

interface Filters {
  search: string;
  city: string;
  industry: string;
  technology: string;
}

export const DiscoverSection = () => {
  const { session } = useSessionContext();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    city: "",
    industry: "",
    technology: "",
  });

  // Subscribe to real-time connection updates
  useEffect(() => {
    if (!session?.user?.id) return;

    const channel = supabase
      .channel('connection_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'connections',
        filter: `sender_id=eq.${session.user.id}`,
      }, () => {
        // Invalidate and refetch data
        queryClient.invalidateQueries({ queryKey: ['founders'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);

  const { data: founders = [], isLoading } = useQuery({
    queryKey: ["founders", filters],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select(`
          *,
          connections!connections_receiver_id_fkey(
            id,
            status,
            sender_id,
            receiver_id
          )
        `);

      if (filters.search) {
        query = query.ilike("full_name", `%${filters.search}%`);
      }

      if (filters.city) {
        query = query.eq("city", filters.city);
      }

      if (filters.industry) {
        query = query.eq("space", filters.industry);
      }

      if (filters.technology) {
        query = query.contains("tech_stack", [filters.technology]);
      }

      // Don't show the current user in the list
      if (session?.user?.id) {
        query = query.neq('id', session.user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching founders:", error);
        toast.error("Failed to load founders");
        return [];
      }

      return data.map(founder => ({
        ...founder,
        isConnected: founder.connections?.some(
          conn => conn.status === 'accepted'
        ),
        isPendingConnection: founder.connections?.some(
          conn => conn.status === 'pending'
        ),
      })) || [];
    },
    enabled: !!session,
  });

  const { createConnection, cancelConnection } = useConnectionMutations();

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <FilterSection onFiltersChange={handleFiltersChange} />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {founders.map((founder) => (
          <FounderCard
            key={founder.id}
            id={founder.id}
            name={founder.full_name}
            role={founder.role}
            city={founder.city}
            techStack={founder.tech_stack}
            industry={founder.space}
            imageUrl={founder.image_url || "https://via.placeholder.com/150"}
            isConnected={founder.isConnected}
            isPendingConnection={founder.isPendingConnection}
            onConnect={() => {
              toast.promise(createConnection(founder.id), {
                loading: 'Sending connection request...',
                success: 'Connection request sent!',
                error: 'Failed to send connection request'
              });
            }}
            onCancelRequest={() => {
              toast.promise(cancelConnection(founder.id), {
                loading: 'Canceling request...',
                success: 'Connection request canceled',
                error: 'Failed to cancel request'
              });
            }}
            bio={founder.bio}
          />
        ))}
      </div>
    </>
  );
};