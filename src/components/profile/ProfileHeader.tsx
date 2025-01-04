import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export const ProfileHeader = ({ isEditing, isLoading, onEdit, onSave }: ProfileHeaderProps) => {
  return (
    <>
      <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Discovery
      </Link>

      <div className="flex justify-between items-start mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
          My Profile
        </h1>
        <Button
          onClick={() => isEditing ? onSave() : onEdit()}
          className="bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : (isEditing ? "Save Changes" : "Edit Profile")}
        </Button>
      </div>
    </>
  );
};