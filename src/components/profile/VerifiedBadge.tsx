import { CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerifiedBadgeProps {
  isVerified: boolean;
  type: string;
}

export const VerifiedBadge = ({ isVerified, type }: VerifiedBadgeProps) => {
  if (!isVerified) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Verified {type}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};