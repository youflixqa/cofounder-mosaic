export interface Profile {
  id: string;
  email: string;
  password: string;
  full_name: string;
  city: string;
  role: string;
  tech_stack: string[];
  space: string;
  bio: string | null;
  image_url: string | null;
  industries: string[] | null;
  email_verified: boolean | null;
  website_verified: boolean | null;
  github_verified: boolean | null;
  linkedin_verified: boolean | null;
  created_at: string;
  updated_at: string;
  website?: string;
  github?: string;
  linkedin?: string;
}

export interface ProfileFormData {
  name: string;
  role: string;
  city: string;
  techStack: string[];
  industries: string[];
  imageUrl: string;
  bio: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  email_verified: boolean;
  website_verified: boolean;
  github_verified: boolean;
  linkedin_verified: boolean;
}