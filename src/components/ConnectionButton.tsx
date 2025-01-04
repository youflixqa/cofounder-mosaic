import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConnectionButtonProps {
  founderId: string;
  isConnected: boolean;
  isPending: boolean;
  onConnect: () => Promise<void>;
  onCancelRequest: () => Promise<void>;
}

export const ConnectionButton = ({
  founderId,
  isConnected,
  isPending,
  onConnect,
  onCancelRequest,
}: ConnectionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: () => Promise<void>) => {
    try {
      setIsLoading(true);
      await action();
    } catch (error) {
      console.error('Connection button error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected) {
    return (
      <Button variant="secondary" disabled>
        Connected
      </Button>
    );
  }

  if (isPending) {
    return (
      <Button 
        variant="outline" 
        onClick={() => handleAction(onCancelRequest)}
        disabled={isLoading}
      >
        {isLoading ? "Canceling..." : "Cancel Request"}
      </Button>
    );
  }

  return (
    <Button 
      onClick={() => handleAction(onConnect)} 
      disabled={isLoading}
    >
      {isLoading ? "Sending..." : "Connect"}
    </Button>
  );
};