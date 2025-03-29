import { Link } from "wouter";
import { ArrowLeft, Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoRefresh: false,
    dataCollection: true
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    // In a real app, this would save settings to backend
    console.log("Settings saved:", settings);
    
    // Show confirmation message (in a real app, use toast or other notification)
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Switch to dark theme for better visibility in low light.</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={settings.darkMode} 
                  onCheckedChange={() => handleToggle('darkMode')} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base">Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications about completed analyses.</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={settings.notifications} 
                  onCheckedChange={() => handleToggle('notifications')} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-refresh" className="text-base">Auto-Refresh Dashboard</Label>
                  <p className="text-sm text-gray-500">Automatically refresh dashboard data every 5 minutes.</p>
                </div>
                <Switch 
                  id="auto-refresh" 
                  checked={settings.autoRefresh} 
                  onCheckedChange={() => handleToggle('autoRefresh')} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection" className="text-base">Anonymous Data Collection</Label>
                  <p className="text-sm text-gray-500">Help us improve by allowing anonymous usage data collection.</p>
                </div>
                <Switch 
                  id="data-collection" 
                  checked={settings.dataCollection} 
                  onCheckedChange={() => handleToggle('dataCollection')} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Account settings such as password changes and profile updates are managed 
              through your organization's account management system.
            </p>
            <Button variant="outline">Contact Administrator</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}