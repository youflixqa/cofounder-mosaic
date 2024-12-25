import { FounderCard } from "@/components/FounderCard";
import { FilterSection } from "@/components/FilterSection";

const mockFounders = [
  {
    name: "Priya Sharma",
    role: "Technical Co-Founder",
    city: "Bangalore",
    techStack: ["React", "Node.js", "AWS"],
    industry: "Fintech",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Rahul Verma",
    role: "Product Lead",
    city: "Mumbai",
    techStack: ["Python", "Django", "AI/ML"],
    industry: "EdTech",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Ananya Patel",
    role: "Full Stack Developer",
    city: "Delhi",
    techStack: ["Flutter", "Firebase", "MongoDB"],
    industry: "HealthTech",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            Find Your Perfect Co-Founder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with talented founders across India's thriving tech ecosystem
          </p>
        </div>

        <FilterSection />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFounders.map((founder) => (
            <FounderCard key={founder.name} {...founder} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;