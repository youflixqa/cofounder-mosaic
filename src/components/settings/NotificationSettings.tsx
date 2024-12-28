import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [connectionAlerts, setConnectionAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);

  const handleSettingChange = (setting: string, value: boolean) => {
    if (setting === 'email') setEmailNotifications(value);
    if (setting === 'connections') setConnectionAlerts(value);
    if (setting === 'messages') setMessageAlerts(value);

    toast({
      title: "Settings updated",
      description: "Your notification settings have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage your notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notif">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive important updates via email
            </p>
          </div>
          <Switch
            id="email-notif"
            checked={emailNotifications}
            onCheckedChange={(checked) => handleSettingChange('email', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="connection-alerts">Connection Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about new connection requests
            </p>
          </div>
          <Switch
            id="connection-alerts"
            checked={connectionAlerts}
            onCheckedChange={(checked) => handleSettingChange('connections', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="message-alerts">Message Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about new messages
            </p>
          </div>
          <Switch
            id="message-alerts"
            checked={messageAlerts}
            onCheckedChange={(checked) => handleSettingChange('messages', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};