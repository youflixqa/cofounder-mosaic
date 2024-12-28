import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { ProfileVisibilitySettings } from "@/components/settings/ProfileVisibilitySettings";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent mb-8">
          Settings
        </h1>
        
        <div className="space-y-8">
          <PrivacySettings />
          <ProfileVisibilitySettings />
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;