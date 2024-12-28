import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ConnectionWithProfile } from "@/types/connection";
import { toast } from "sonner";

interface ConnectionRequestsProps {
  requests: ConnectionWithProfile[];
  onAccept: (connectionId: string) => Promise<void>;
  onReject: (connectionId: string) => Promise<void>;
}

export const ConnectionRequests = ({
  requests,
  onAccept,
  onReject,
}: ConnectionRequestsProps) => {
  const handleAccept = async (connectionId: string) => {
    try {
      await onAccept(connectionId);
      toast.success("Connection request accepted!");
    } catch (error) {
      toast.error("Failed to accept connection request");
    }
  };

  const handleReject = async (connectionId: string) => {
    try {
      await onReject(connectionId);
      toast.success("Connection request rejected");
    } catch (error) {
      toast.error("Failed to reject connection request");
    }
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No pending connection requests
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <img
                  src={request.sender.imageUrl}
                  alt={request.sender.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {request.sender.name}
              </div>
            </TableCell>
            <TableCell>{request.sender.role}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};