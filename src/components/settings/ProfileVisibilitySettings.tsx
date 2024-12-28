import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const ProfileVisibilitySettings = () => {
  const { toast } = useToast();
  const [showInFeed, setShowInFeed] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showSocial, setShowSocial] = useState(true);

  const handleSettingChange = (setting: string, value: boolean) => {
    if (setting === 'feed') setShowInFeed(value);
    if (setting === 'email') setShowEmail(value);
    if (setting === 'social') setShowSocial(value);

    toast({
      title: "Settings updated",
      description: "Your visibility settings have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Visibility</CardTitle>
        <CardDescription>Control what others can see about you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="feed">Show in Discovery Feed</Label>
            <p className="text-sm text-muted-foreground">
              Make your profile visible in the co-founder discovery feed
            </p>
          </div>
          <Switch
            id="feed"
            checked={showInFeed}
            onCheckedChange={(checked) => handleSettingChange('feed', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email">Show Email Address</Label>
            <p className="text-sm text-muted-foreground">
              Display your email address on your public profile
            </p>
          </div>
          <Switch
            id="email"
            checked={showEmail}
            onCheckedChange={(checked) => handleSettingChange('email', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="social">Show Social Links</Label>
            <p className="text-sm text-muted-foreground">
              Display your social media links on your public profile
            </p>
          </div>
          <Switch
            id="social"
            checked={showSocial}
            onCheckedChange={(checked) => handleSettingChange('social', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};