import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MultiSelect } from "./MultiSelect";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface FilterSectionProps {
  onFiltersChange: (filters: {
    search: string;
    cities: string[];
    industries: string[];
    technologies: string[];
  }) => void;
}

interface FilterOption {
  id: string;
  type: string;
  value: string;
}

export const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [search, setSearch] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const { data: filterOptions = [], isLoading } = useQuery({
    queryKey: ["filterOptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("filter_options")
        .select("*")
        .order("value");

      if (error) {
        console.error("Error fetching filter options:", error);
        throw error;
      }

      return data as FilterOption[];
    },
  });

  // Organize filter options by type with safe fallbacks
  const cities = filterOptions
    .filter((option) => option.type === "city")
    .map((option) => option.value) || [];
  const industries = filterOptions
    .filter((option) => option.type === "industry")
    .map((option) => option.value) || [];
  const technologies = filterOptions
    .filter((option) => option.type === "technology")
    .map((option) => option.value) || [];

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onFiltersChange({
        search,
        cities: selectedCities,
        industries: selectedIndustries,
        technologies: selectedTechnologies,
      });
    }, 100);

    return () => clearTimeout(debounceTimeout);
  }, [search, selectedCities, selectedIndustries, selectedTechnologies, onFiltersChange]);

  if (isLoading) {
    return (
      <div className="w-full p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Input
            placeholder="Search founders..."
            className="pl-10 bg-white/80 backdrop-blur-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MultiSelect
            options={cities}
            selected={selectedCities}
            onChange={setSelectedCities}
            placeholder="Select Cities"
          />

          <MultiSelect
            options={industries}
            selected={selectedIndustries}
            onChange={setSelectedIndustries}
            placeholder="Select Industries"
          />

          <MultiSelect
            options={technologies}
            selected={selectedTechnologies}
            onChange={setSelectedTechnologies}
            placeholder="Select Technologies"
          />
        </div>
      </div>
    </div>
  );
};