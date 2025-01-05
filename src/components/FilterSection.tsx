import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MultiSelect } from "./MultiSelect";

const cities = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"];
const industries = ["Fintech", "EdTech", "HealthTech", "E-commerce", "SaaS", "AI/ML"];
const technologies = ["React", "Python", "Node.js", "Java", "Flutter", "AWS"];

interface FilterSectionProps {
  onFiltersChange: (filters: {
    search: string;
    cities: string[];
    industries: string[];
    technologies: string[];
  }) => void;
}

export const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [search, setSearch] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  useEffect(() => {
    onFiltersChange({
      search,
      cities: selectedCities,
      industries: selectedIndustries,
      technologies: selectedTechnologies,
    });
  }, [search, selectedCities, selectedIndustries, selectedTechnologies, onFiltersChange]);

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