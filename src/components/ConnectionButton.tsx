import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface ConnectionButtonProps {
  founderId: string;
  isConnected: boolean;
  isPending: boolean;
  onConnect: () => Promise<void>;
}

export const ConnectionButton = ({
  founderId,
  isConnected,
  isPending,
  onConnect,
}: ConnectionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await onConnect();
      toast.success("Connection request sent!");
    } catch (error) {
      toast.error("Failed to send connection request");
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
      <Button variant="outline" disabled>
        Request Pending
      </Button>
    );
  }

  return (
    <Button onClick={handleConnect} disabled={isLoading}>
      {isLoading ? "Sending..." : "Connect"}
    </Button>
  );
};