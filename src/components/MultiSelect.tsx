import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

export const MultiSelect = ({
  options = [],
  selected = [],
  onChange,
  placeholder,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  // Ensure we have valid arrays to work with
  const safeOptions = Array.isArray(options) ? options : [];
  const safeSelected = Array.isArray(selected) ? selected : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white/80 backdrop-blur-sm"
        >
          {safeSelected.length === 0
            ? placeholder
            : `${safeSelected.length} selected`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {safeOptions.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => handleSelect(option)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    safeSelected.includes(option) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};