import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Globe, Github, Linkedin, Plus, X } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rahul Verma",
    role: "Product Lead",
    city: "Mumbai",
    techStack: ["Python", "Django", "AI/ML"],
    industry: "EdTech",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Product leader passionate about democratizing education through technology. Built and scaled multiple ed-tech products reaching 100K+ students.",
    email: "rahul.verma@example.com",
    website: "https://rahulverma.dev",
    github: "https://github.com/rahulverma",
    linkedin: "https://linkedin.com/in/rahulverma",
  });

  const [newTech, setNewTech] = useState("");

  const handleSave = () => {
    // TODO: Implement actual save logic
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const addTechStack = () => {
    if (newTech && !profile.techStack.includes(newTech)) {
      setProfile({
        ...profile,
        techStack: [...profile.techStack, newTech],
      });
      setNewTech("");
    }
  };

  const removeTechStack = (tech: string) => {
    setProfile({
      ...profile,
      techStack: profile.techStack.filter((t) => t !== tech),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
      <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Discovery
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            My Profile
          </h1>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
            />
            {isEditing && (
              <Input
                type="text"
                placeholder="Image URL"
                value={profile.imageUrl}
                onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
                className="mt-2"
              />
            )}
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              {isEditing ? (
                <Input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-2xl font-bold"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
              )}
              {isEditing ? (
                <Input
                  type="text"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="mt-2"
                />
              ) : (
                <p className="text-xl text-gray-600 mt-1">{profile.role}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Bio</h3>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-gray-700">{profile.bio}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-base bg-purple-100 text-purple-800"
                  >
                    {tech}
                    {isEditing && (
                      <button
                        onClick={() => removeTechStack(tech)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    placeholder="Add technology"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                  />
                  <Button
                    onClick={addTechStack}
                    size="icon"
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                {isEditing ? (
                  <Input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700">{profile.city}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Industry</h3>
                {isEditing ? (
                  <Input
                    type="text"
                    value={profile.industry}
                    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-700">{profile.industry}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Contact & Social</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    ) : (
                      <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
                        {profile.email}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-500" />
                    {isEditing ? (
                      <Input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      />
                    ) : (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.website}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-gray-500" />
                    {isEditing ? (
                      <Input
                        type="url"
                        value={profile.github}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      />
                    ) : (
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.github}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-gray-500" />
                    {isEditing ? (
                      <Input
                        type="url"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      />
                    ) : (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.linkedin}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;