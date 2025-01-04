import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface IndustrySelectorProps {
  industries: string[];
  onChange: (industries: string[]) => void;
  isEditing: boolean;
}

export const IndustrySelector = ({ industries, onChange, isEditing }: IndustrySelectorProps) => {
  const [newIndustry, setNewIndustry] = useState("");

  const addIndustry = () => {
    if (newIndustry && !industries.includes(newIndustry)) {
      onChange([...industries, newIndustry]);
      setNewIndustry("");
    }
  };

  const removeIndustry = (industry: string) => {
    onChange(industries.filter((i) => i !== industry));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Industries</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {industries.map((industry) => (
          <Badge
            key={industry}
            variant="secondary"
            className="text-base bg-purple-100 text-purple-800"
          >
            {industry}
            {isEditing && (
              <button
                onClick={() => removeIndustry(industry)}
                className="ml-2 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
      {isEditing && (
        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            placeholder="Add industry"
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addIndustry();
              }
            }}
          />
          <Button
            onClick={addIndustry}
            size="icon"
            className="bg-purple-500 hover:bg-purple-600"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};