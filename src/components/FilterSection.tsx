import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const cities = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"];
const industries = ["Fintech", "EdTech", "HealthTech", "E-commerce", "SaaS", "AI/ML"];
const technologies = ["React", "Python", "Node.js", "Java", "Flutter", "AWS"];

interface FilterSectionProps {
  onFiltersChange: (filters: {
    search: string;
    city: string;
    industry: string;
    technology: string;
  }) => void;
}

export const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [technology, setTechnology] = useState("");

  useEffect(() => {
    onFiltersChange({ search, city, industry, technology });
  }, [search, city, industry, technology, onFiltersChange]);

  return (
    <div className="w-full p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search founders..."
            className="pl-10 bg-white/80 backdrop-blur-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <select 
          className="flex-1 px-4 py-2 rounded-md border border-gray-200 bg-white/80 backdrop-blur-sm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select 
          className="flex-1 px-4 py-2 rounded-md border border-gray-200 bg-white/80 backdrop-blur-sm"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="">Select Industry</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>

        <select 
          className="flex-1 px-4 py-2 rounded-md border border-gray-200 bg-white/80 backdrop-blur-sm"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        >
          <option value="">Select Technology</option>
          {technologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};