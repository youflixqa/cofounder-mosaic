import { Button } from "@/components/ui/button";

interface ProfileImageProps {
  imageUrl: string;
  isEditing: boolean;
  isLoading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const ProfileImage = ({ imageUrl, isEditing, isLoading, onImageUpload, fileInputRef }: ProfileImageProps) => {
  return (
    <div className="relative">
      <img
        src={imageUrl || "https://via.placeholder.com/300"}
        alt="Profile"
        className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
      />
      {isEditing && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 w-full"
            disabled={isLoading}
          >
            Upload New Image
          </Button>
        </>
      )}
    </div>
  );
};