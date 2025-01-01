import { FounderCard } from "@/components/FounderCard";
import { FilterSection } from "@/components/FilterSection";
import { useConnectionMutations } from "@/hooks/useConnectionMutations";
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Filters {
  search: string;
  city: string;
  industry: string;
  technology: string;
}

export const DiscoverSection = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    city: "",
    industry: "",
    technology: "",
  });

  const { data: founders = [], isLoading } = useQuery({
    queryKey: ["founders", filters],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("*");

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

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching founders:", error);
        return [];
      }

      return data || [];
    },
  });

  const { createConnection } = useConnectionMutations();

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
            isConnected={false}
            isPendingConnection={false}
            onConnect={() => createConnection(founder.id)}
            bio={founder.bio}
          />
        ))}
      </div>
    </>
  );
};