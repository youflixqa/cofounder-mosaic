import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Code2, Briefcase } from "lucide-react";
import { ConnectionButton } from "./ConnectionButton";
import { useState } from "react";
import { FounderDetailView } from "./FounderDetailView";

interface FounderCardProps {
  id: string;
  name: string;
  role: string;
  city: string;
  techStack: string[];
  industry: string;
  imageUrl: string;
  isConnected: boolean;
  isPendingConnection: boolean;
  onConnect: () => Promise<void>;
  bio?: string;
  email?: string;
  website?: string;
  github?: string;
  linkedin?: string;
}

export const FounderCard = ({
  id,
  name,
  role,
  city,
  techStack,
  industry,
  imageUrl,
  isConnected,
  isPendingConnection,
  onConnect,
  bio,
  email,
  website,
  github,
  linkedin,
}: FounderCardProps) => {
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  return (
    <>
      <Card 
        className="group relative overflow-hidden p-6 transition-all hover:shadow-xl hover:animate-card-hover bg-gradient-to-br from-white to-purple-50 border-2 border-primary/20 cursor-pointer"
        onClick={() => setIsDetailViewOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <img
                src={imageUrl}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
                <p className="text-lg text-gray-600">{role}</p>
              </div>
            </div>
            <ConnectionButton
              founderId={id}
              isConnected={isConnected}
              isPending={isPendingConnection}
              onConnect={onConnect}
            />
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{city}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Code2 className="w-5 h-5 text-secondary" />
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-5 h-5 text-accent" />
              <span>{industry}</span>
            </div>
          </div>
        </div>
      </Card>

      <FounderDetailView
        isOpen={isDetailViewOpen}
        onClose={() => setIsDetailViewOpen(false)}
        founder={{
          id,
          name,
          role,
          city,
          techStack,
          industry,
          imageUrl,
          bio,
          email,
          website,
          github,
          linkedin,
        }}
      />
    </>
  );
};