import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { ConnectionWithProfile } from "@/types/connection";
import { useNavigate } from "react-router-dom";

interface MyConnectionsProps {
  connections: ConnectionWithProfile[];
}

export const MyConnections = ({ connections }: MyConnectionsProps) => {
  const navigate = useNavigate();

  if (connections.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No connections yet
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Connected Since</TableHead>
          <TableHead>Last Message</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {connections.map((connection) => {
          const connectedPerson = connection.sender.name === "Current User" ? connection.receiver : connection.sender;
          return (
            <TableRow key={connection.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <img
                    src={connectedPerson.imageUrl}
                    alt={connectedPerson.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  {connectedPerson.name}
                </div>
              </TableCell>
              <TableCell>{connectedPerson.role}</TableCell>
              <TableCell>
                {new Date(connection.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {connection.lastMessage ? (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {connection.lastMessage}
                    </span>
                    <span className="text-xs text-gray-400">
                      {connection.lastMessageTime && new Date(connection.lastMessageTime).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">No messages yet</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => navigate(`/chat/${connection.id}`)}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </Button>
              </TableCell>
            </TableRow>
          )})}
      </TableBody>
    </Table>
  );
};