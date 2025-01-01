import { FounderCard } from "@/components/FounderCard";
import { FilterSection } from "@/components/FilterSection";
import { useConnectionMutations } from "@/hooks/useConnectionMutations";

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

export const DiscoverSection = () => {
  const { createConnection } = useConnectionMutations();

  return (
    <>
      <FilterSection />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockFounders.map((founder) => (
          <FounderCard
            key={founder.id}
            {...founder}
            onConnect={() => createConnection(founder.id)}
          />
        ))}
      </div>
    </>
  );
};
