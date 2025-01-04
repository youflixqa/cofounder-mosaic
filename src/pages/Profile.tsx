import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Globe, Github, Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { IndustrySelector } from "@/components/profile/IndustrySelector";
import { VerifiedBadge } from "@/components/profile/VerifiedBadge";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileImage } from "@/components/profile/ProfileImage";
import type { Profile as ProfileType, ProfileFormData } from "@/types/profile";

const Profile = () => {
  const { session } = useSessionContext();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<ProfileFormData>({
    name: "",
    role: "",
    city: "",
    techStack: [],
    industries: [],
    imageUrl: "",
    bio: "",
    email: "",
    website: "",
    github: "",
    linkedin: "",
    email_verified: false,
    website_verified: false,
    github_verified: false,
    linkedin_verified: false,
  });

  const [newTech, setNewTech] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [session?.user?.id]);

  const loadProfile = async () => {
    if (!session?.user?.id) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (data) {
      const profileData = data as ProfileType;
      setProfile({
        name: profileData.full_name,
        role: profileData.role,
        city: profileData.city,
        techStack: profileData.tech_stack,
        industries: profileData.industries || [],
        imageUrl: profileData.image_url || "",
        bio: profileData.bio || "",
        email: profileData.email,
        website: profileData.website || "",
        github: profileData.github || "",
        linkedin: profileData.linkedin || "",
        email_verified: profileData.email_verified || false,
        website_verified: profileData.website_verified || false,
        github_verified: profileData.github_verified || false,
        linkedin_verified: profileData.linkedin_verified || false,
      });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !session?.user?.id) return;

    setIsLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${session.user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ image_url: publicUrl })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, imageUrl: publicUrl });
      toast({
        title: "Success",
        description: "Profile image updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.name,
          role: profile.role,
          city: profile.city,
          tech_stack: profile.techStack,
          industries: profile.industries,
          bio: profile.bio,
          website: profile.website,
          github: profile.github,
          linkedin: profile.linkedin,
        })
        .eq('id', session.user.id);

      if (error) throw error;

      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      <ProfileHeader
        isEditing={isEditing}
        isLoading={isLoading}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <ProfileImage
              imageUrl={profile.imageUrl}
              isEditing={isEditing}
              isLoading={isLoading}
              onImageUpload={handleImageUpload}
              fileInputRef={fileInputRef}
            />
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

            <IndustrySelector
              industries={profile.industries}
              onChange={(industries) => setProfile({ ...profile, industries })}
              isEditing={isEditing}
            />

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
                <h3 className="text-lg font-semibold mb-2">Contact & Social</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-primary">{profile.email}</span>
                    <VerifiedBadge isVerified={profile.email_verified} type="email" />
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
                    <VerifiedBadge isVerified={profile.website_verified} type="website" />
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
                    <VerifiedBadge isVerified={profile.github_verified} type="GitHub" />
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
                    <VerifiedBadge isVerified={profile.linkedin_verified} type="LinkedIn" />
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
