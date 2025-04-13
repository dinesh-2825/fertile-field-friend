
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database, 
  Upload, 
  Download,
  Cloud,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  // Profile settings state
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    farm: 'Smith Family Farm',
    location: '123 Farm Rd, Farmville, CA'
  });
  
  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    darkMode: false,
    autoUpdates: true,
    dataSync: true,
    backupFrequency: 'daily',
    storageUsed: 284, // MB
    storageTotal: 1024, // MB
    apiKey: 'farm_sk_7a8d9f2e3b1c5g6h7j8k9l0m',
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    critical: true,
    warning: true,
    info: false,
  });
  
  // Subscription settings state
  const [subscription, setSubscription] = useState({
    plan: 'Pro',
    billingCycle: 'Monthly',
    nextBilling: new Date('2025-05-15'),
    price: 29.99
  });
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  // Handle system settings changes
  const toggleSystemSetting = (setting: keyof typeof systemSettings) => {
    if (typeof systemSettings[setting] === 'boolean') {
      setSystemSettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
      
      toast({
        title: "Setting Updated",
        description: `${setting.charAt(0).toUpperCase() + setting.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${!systemSettings[setting as keyof typeof systemSettings] ? 'enabled' : 'disabled'}.`,
      });
    }
  };
  
  // Handle notification settings changes
  const toggleNotificationSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Notification Setting Updated",
      description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} notifications ${!notificationSettings[setting] ? 'enabled' : 'disabled'}.`,
    });
  };
  
  // Handle subscription update
  const updateSubscription = (newPlan: string) => {
    setSubscription(prev => ({
      ...prev,
      plan: newPlan
    }));
    
    toast({
      title: "Subscription Updated",
      description: `Your subscription has been updated to the ${newPlan} plan.`,
    });
  };
  
  // Generate new API key
  const generateNewApiKey = () => {
    const newKey = 'farm_sk_' + Math.random().toString(36).substring(2, 15);
    
    setSystemSettings(prev => ({
      ...prev,
      apiKey: newKey
    }));
    
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated successfully.",
    });
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and system preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-4">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <SettingsIcon className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscription
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal and farm information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="farm">Farm Name</Label>
                      <Input 
                        id="farm"
                        value={profile.farm}
                        onChange={(e) => setProfile({...profile, farm: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location</Label>
                    <Input 
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure your system preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for the interface
                    </p>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={systemSettings.darkMode} 
                    onCheckedChange={() => toggleSystemSetting('darkMode')} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-updates">Automatic Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically download and install updates
                    </p>
                  </div>
                  <Switch 
                    id="auto-updates" 
                    checked={systemSettings.autoUpdates} 
                    onCheckedChange={() => toggleSystemSetting('autoUpdates')} 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-sync">Data Synchronization</Label>
                    <p className="text-sm text-muted-foreground">
                      Sync data across all your devices
                    </p>
                  </div>
                  <Switch 
                    id="data-sync" 
                    checked={systemSettings.dataSync} 
                    onCheckedChange={() => toggleSystemSetting('dataSync')} 
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <select 
                    id="backup-frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={systemSettings.backupFrequency}
                    onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage</CardTitle>
                  <CardDescription>
                    View and manage your storage usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {systemSettings.storageUsed} MB used of {systemSettings.storageTotal} MB
                      </span>
                      <span>
                        {Math.round((systemSettings.storageUsed / systemSettings.storageTotal) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(systemSettings.storageUsed / systemSettings.storageTotal) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Backup Data
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>
                    Manage your API keys for third-party integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="api-key"
                        value={systemSettings.apiKey}
                        readOnly
                        type="password"
                      />
                      <Button variant="outline" onClick={generateNewApiKey}>
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This key provides full access to your farm data. Keep it secure.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Methods</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <Label htmlFor="email-notifications" className="font-medium">
                        Email
                      </Label>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notificationSettings.email} 
                      onCheckedChange={() => toggleNotificationSetting('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Bell className="h-4 w-4 text-purple-500" />
                      </div>
                      <Label htmlFor="push-notifications" className="font-medium">
                        Push
                      </Label>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={notificationSettings.push} 
                      onCheckedChange={() => toggleNotificationSetting('push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <Label htmlFor="sms-notifications" className="font-medium">
                        SMS
                      </Label>
                    </div>
                    <Switch 
                      id="sms-notifications" 
                      checked={notificationSettings.sms} 
                      onCheckedChange={() => toggleNotificationSetting('sms')}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Types</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-red-500" />
                      </div>
                      <Label htmlFor="critical-notifications" className="font-medium">
                        Critical
                      </Label>
                    </div>
                    <Switch 
                      id="critical-notifications" 
                      checked={notificationSettings.critical} 
                      onCheckedChange={() => toggleNotificationSetting('critical')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-amber-500" />
                      </div>
                      <Label htmlFor="warning-notifications" className="font-medium">
                        Warning
                      </Label>
                    </div>
                    <Switch 
                      id="warning-notifications" 
                      checked={notificationSettings.warning} 
                      onCheckedChange={() => toggleNotificationSetting('warning')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Bell className="h-4 w-4 text-blue-500" />
                      </div>
                      <Label htmlFor="info-notifications" className="font-medium">
                        Info
                      </Label>
                    </div>
                    <Switch 
                      id="info-notifications" 
                      checked={notificationSettings.info} 
                      onCheckedChange={() => toggleNotificationSetting('info')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={`border-2 ${subscription.plan === 'Basic' ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>
                      For small farms and individual farmers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Up to 3 fields
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Basic analytics
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Email support
                      </li>
                    </ul>
                    <Button 
                      variant={subscription.plan === 'Basic' ? 'secondary' : 'default'}
                      className="w-full"
                      onClick={() => updateSubscription('Basic')}
                      disabled={subscription.plan === 'Basic'}
                    >
                      {subscription.plan === 'Basic' ? 'Current Plan' : 'Downgrade'}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className={`border-2 ${subscription.plan === 'Pro' ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>
                      For medium-sized farms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">$29.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Up to 10 fields
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Priority support
                      </li>
                    </ul>
                    <Button 
                      variant={subscription.plan === 'Pro' ? 'secondary' : 'default'}
                      className="w-full"
                      onClick={() => updateSubscription('Pro')}
                      disabled={subscription.plan === 'Pro'}
                    >
                      {subscription.plan === 'Pro' ? 'Current Plan' : 'Switch to Pro'}
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className={`border-2 ${subscription.plan === 'Enterprise' ? 'border-primary' : 'border-border'}`}>
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>
                      For large agricultural operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">$99.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Unlimited fields
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        AI-powered insights
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        24/7 dedicated support
                      </li>
                    </ul>
                    <Button 
                      variant={subscription.plan === 'Enterprise' ? 'secondary' : 'default'}
                      className="w-full"
                      onClick={() => updateSubscription('Enterprise')}
                      disabled={subscription.plan === 'Enterprise'}
                    >
                      {subscription.plan === 'Enterprise' ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing Information</h3>
                
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Plan:</span>
                    <span className="font-medium">{subscription.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Billing Cycle:</span>
                    <span className="font-medium">{subscription.billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next Billing Date:</span>
                    <span className="font-medium">{formatDate(subscription.nextBilling)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="font-medium">${subscription.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Cloud className="h-4 w-4 mr-2" />
                    View Billing History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
