import { FounderCard } from "@/components/FounderCard";
import { FilterSection } from "@/components/FilterSection";
import { ConnectionRequests } from "@/components/ConnectionRequests";
import { MyConnections } from "@/components/MyConnections";
import ProfileDropdown from "@/components/ProfileDropdown";
import { useState } from "react";
import { ConnectionWithProfile } from "@/types/connection";

const mockFounders = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Technical Co-Founder",
    city: "Bangalore",
    techStack: ["React", "Node.js", "AWS"],
    industry: "Fintech",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    isConnected: false,
    isPendingConnection: false,
    bio: "Experienced technical leader with 8+ years in fintech. Previously led engineering at a YC-backed startup. Looking to revolutionize financial services in India.",
    email: "priya.sharma@example.com",
    github: "https://github.com/priyasharma",
    linkedin: "https://linkedin.com/in/priyasharma",
  },
  {
    id: "2",
    name: "Rahul Verma",
    role: "Product Lead",
    city: "Mumbai",
    techStack: ["Python", "Django", "AI/ML"],
    industry: "EdTech",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    isConnected: true,
    isPendingConnection: false,
    bio: "Product leader passionate about democratizing education through technology. Built and scaled multiple ed-tech products reaching 100K+ students.",
    email: "rahul.verma@example.com",
    website: "https://rahulverma.dev",
    linkedin: "https://linkedin.com/in/rahulverma",
  },
  {
    id: "3",
    name: "Ananya Patel",
    role: "Full Stack Developer",
    city: "Delhi",
    techStack: ["Flutter", "Firebase", "MongoDB"],
    industry: "HealthTech",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    isConnected: false,
    isPendingConnection: true,
    bio: "Full-stack developer with expertise in mobile app development. Created multiple health-tech solutions during COVID-19. Looking to build scalable healthcare platforms.",
    email: "ananya.patel@example.com",
    github: "https://github.com/ananyapatel",
    linkedin: "https://linkedin.com/in/ananyapatel",
  },
];

const mockRequests: ConnectionWithProfile[] = [
  {
    id: "1",
    senderId: "4",
    receiverId: "current-user",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sender: {
      name: "Vikram Singh",
      role: "AI Engineer",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    receiver: {
      name: "Current User",
      role: "Frontend Developer",
      imageUrl: "",
    },
  },
];

const mockConnections: ConnectionWithProfile[] = [
  {
    id: "2",
    senderId: "5",
    receiverId: "current-user",
    status: "accepted",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sender: {
      name: "Neha Gupta",
      role: "Product Manager",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    receiver: {
      name: "Current User",
      role: "Frontend Developer",
      imageUrl: "",
    },
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'connections'>('discover');

  const handleConnect = async (founderId: string) => {
    console.log("Connecting with founder:", founderId);
  };

  const handleAcceptRequest = async (connectionId: string) => {
    console.log("Accepting connection request:", connectionId);
  };

  const handleRejectRequest = async (connectionId: string) => {
    console.log("Rejecting connection request:", connectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <ProfileDropdown />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Find Your Perfect Co-Founder
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

        {activeTab === 'discover' && (
          <>
            <FilterSection />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockFounders.map((founder) => (
                <FounderCard
                  key={founder.id}
                  {...founder}
                  onConnect={() => handleConnect(founder.id)}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Connection Requests</h2>
            <ConnectionRequests
              requests={mockRequests}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">My Connections</h2>
            <MyConnections connections={mockConnections} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
