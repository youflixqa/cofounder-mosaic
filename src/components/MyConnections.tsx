import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConnectionWithProfile } from "@/types/connection";

interface MyConnectionsProps {
  connections: ConnectionWithProfile[];
}

export const MyConnections = ({ connections }: MyConnectionsProps) => {
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
                  />
                  {connectedPerson.name}
                </div>
              </TableCell>
              <TableCell>{connectedPerson.role}</TableCell>
              <TableCell>
                {new Date(connection.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          )})}
      </TableBody>
    </Table>
  );
};