import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Code2, Briefcase, Mail, Globe, Github, Linkedin } from "lucide-react";

interface FounderDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  founder: {
    id: string;
    name: string;
    role: string;
    city: string;
    techStack: string[];
    industry: string;
    imageUrl: string;
    bio?: string;
    email?: string;
    website?: string;
    github?: string;
    linkedin?: string;
  };
}

export const FounderDetailView = ({ isOpen, onClose, founder }: FounderDetailViewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-50 to-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Founder Profile
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="flex items-start gap-6">
            <img
              src={founder.imageUrl}
              alt={founder.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-xl"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{founder.name}</h2>
              <p className="text-xl text-gray-600 mt-1">{founder.role}</p>
              {founder.bio && (
                <p className="mt-4 text-gray-700 leading-relaxed">
                  {founder.bio}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-lg">{founder.city}</span>
            </div>

            <div className="flex items-start gap-3 text-gray-700">
              <Code2 className="w-6 h-6 text-secondary flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {founder.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-base bg-secondary/10 text-secondary hover:bg-secondary/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase className="w-6 h-6 text-accent" />
              <span className="text-lg">{founder.industry}</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              {founder.email && (
                <a
                  href={`mailto:${founder.email}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
              )}
              {founder.website && (
                <a
                  href={founder.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Website</span>
                </a>
              )}
              {founder.github && (
                <a
                  href={founder.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              )}
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};