import { ConnectionRequests } from "@/components/ConnectionRequests";
import { useConnectionRequests } from "@/hooks/useConnectionRequests";
import { useConnectionMutations } from "@/hooks/useConnectionMutations";

export const RequestsSection = () => {
  const { data: requests = [] } = useConnectionRequests();
  const { acceptConnection, rejectConnection } = useConnectionMutations();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Connection Requests</h2>
      <ConnectionRequests
        requests={requests}
        onAccept={acceptConnection}
        onReject={rejectConnection}
      />
    </div>
  );
};