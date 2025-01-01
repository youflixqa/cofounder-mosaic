import { MyConnections } from "@/components/MyConnections";
import { useConnections } from "@/hooks/useConnections";

export const ConnectionsSection = () => {
  const { data: connections = [] } = useConnections();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">My Connections</h2>
      <MyConnections connections={connections} />
    </div>
  );
};