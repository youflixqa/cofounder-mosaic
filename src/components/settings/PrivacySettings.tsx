import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const PrivacySettings = () => {
  const { toast } = useToast();
  const [allowRequests, setAllowRequests] = useState(true);
  const [allowMessaging, setAllowMessaging] = useState(true);

  const handleSettingChange = (setting: string, value: boolean) => {
    if (setting === 'requests') setAllowRequests(value);
    if (setting === 'messaging') setAllowMessaging(value);

    toast({
      title: "Settings updated",
      description: "Your privacy settings have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Control who can interact with you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="requests">Connection Requests</Label>
            <p className="text-sm text-muted-foreground">
              Allow others to send you connection requests
            </p>
          </div>
          <Switch
            id="requests"
            checked={allowRequests}
            onCheckedChange={(checked) => handleSettingChange('requests', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="messaging">Direct Messaging</Label>
            <p className="text-sm text-muted-foreground">
              Allow connections to send you direct messages
            </p>
          </div>
          <Switch
            id="messaging"
            checked={allowMessaging}
            onCheckedChange={(checked) => handleSettingChange('messaging', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};