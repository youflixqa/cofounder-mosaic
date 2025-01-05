import { useState } from "react";
import ProfileDropdown from "@/components/ProfileDropdown";
import { DiscoverSection } from "@/components/discover/DiscoverSection";
import { RequestsSection } from "@/components/requests/RequestsSection";
import { ConnectionsSection } from "@/components/connections/ConnectionsSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'connections'>('discover');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <ProfileDropdown />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Find Your Perfect Co-Founder 123 shobhit
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with talented founders across India's thriving tech ecosystem
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'discover'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'requests'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'connections'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            My Connections
          </button>
        </div>

        {activeTab === 'discover' && <DiscoverSection />}
        {activeTab === 'requests' && <RequestsSection />}
        {activeTab === 'connections' && <ConnectionsSection />}
      </div>
    </div>
  );
};

export default Index;