import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  AlertCircle, 
  Bell, 
  CheckCircle, 
  Clock, 
  Droplet, 
  AlertTriangle,
  BarChart, 
  Thermometer,
  Wind,
  Settings as SettingsIcon,
  CloudRain,
  Sprout,
  ToggleLeft
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'info';
  source: 'irrigation' | 'weather' | 'crops' | 'system';
  timestamp: Date;
  resolved: boolean;
}

const Alerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    critical: true,
    warning: true,
    info: false
  });
  
  useEffect(() => {
    const initialAlerts: Alert[] = [
      {
        id: '1',
        title: 'Low Soil Moisture',
        message: 'Soil moisture in Field 3 (Soybeans) is below critical threshold (27%).',
        type: 'critical',
        source: 'irrigation',
        timestamp: new Date(Date.now() - 25 * 60000),
        resolved: false
      },
      {
        id: '2',
        title: 'Irrigation System Alert',
        message: 'Pressure drop detected in Field 2 irrigation system. Possible leak or malfunction.',
        type: 'warning',
        source: 'irrigation',
        timestamp: new Date(Date.now() - 55 * 60000),
        resolved: false
      },
      {
        id: '3',
        title: 'Weather Alert',
        message: 'Strong winds expected tomorrow (25-30 km/h). Consider delaying scheduled spraying.',
        type: 'warning',
        source: 'weather',
        timestamp: new Date(Date.now() - 125 * 60000),
        resolved: false
      },
      {
        id: '4',
        title: 'Crop Growth',
        message: 'Corn in North Field has reached vegetative stage.',
        type: 'info',
        source: 'crops',
        timestamp: new Date(Date.now() - 240 * 60000),
        resolved: true
      },
      {
        id: '5',
        title: 'System Update',
        message: 'Farm monitoring system updated to version 2.1.5.',
        type: 'info',
        source: 'system',
        timestamp: new Date(Date.now() - 360 * 60000),
        resolved: true
      }
    ];
    
    setAlerts(initialAlerts);
    
    const interval = setInterval(() => {
      const newAlerts = [
        {
          title: 'Temperature Spike',
          message: 'Sudden temperature increase detected in greenhouse (4°C in 30 minutes).',
          type: 'warning' as const,
          source: 'system' as const
        },
        {
          title: 'Pest Activity Detected',
          message: 'Increased pest activity detected in Field 1 (Corn). Consider inspection.',
          type: 'warning' as const,
          source: 'crops' as const
        },
        {
          title: 'Battery Low',
          message: 'Sensor unit 3 battery at 15%. Replacement recommended within 48 hours.',
          type: 'info' as const,
          source: 'system' as const
        },
        {
          title: 'Nitrogen Level Low',
          message: 'Nitrogen levels below optimal in Field 4 (Potatoes).',
          type: 'warning' as const,
          source: 'crops' as const
        },
        {
          title: 'Rain Expected',
          message: 'Heavy rain expected in the next 6 hours. Irrigation schedule automatically adjusted.',
          type: 'info' as const,
          source: 'weather' as const
        }
      ];
      
      const randomAlert = newAlerts[Math.floor(Math.random() * newAlerts.length)];
      const shouldBeCritical = Math.random() < 0.2;
      
      const newAlert: Alert = {
        id: Date.now().toString(),
        title: randomAlert.title,
        message: randomAlert.message,
        type: shouldBeCritical ? 'critical' : randomAlert.type,
        source: randomAlert.source,
        timestamp: new Date(),
        resolved: false
      };
      
      setAlerts(prev => [newAlert, ...prev]);
      
      if (newAlert.type === 'critical') {
        toast({
          title: "Critical Alert: " + newAlert.title,
          description: newAlert.message,
          variant: "destructive",
        });
      }
    }, 40000);
    
    return () => clearInterval(interval);
  }, [toast]);
  
  const resolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    );
    
    toast({
      title: "Alert Resolved",
      description: "The alert has been marked as resolved.",
    });
  };
  
  const resolveAllAlerts = () => {
    setAlerts(prev => 
      prev.map(alert => ({ ...alert, resolved: true }))
    );
    
    toast({
      title: "All Alerts Resolved",
      description: "All alerts have been marked as resolved.",
    });
  };
  
  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert Deleted",
      description: "The alert has been deleted from the system.",
    });
  };
  
  const getAlertIcon = (type: Alert['type'], source: Alert['source']) => {
    if (type === 'critical') {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
    
    if (type === 'warning') {
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    }
    
    switch (source) {
      case 'irrigation':
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case 'weather':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'crops':
        return <Sprout className="h-5 w-5 text-green-500" />;
      case 'system':
        return <SettingsIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const hours = Math.floor(diffMinutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };
  
  const getActiveAlertsCount = () => {
    return alerts.filter(alert => !alert.resolved).length;
  };
  
  const getCriticalAlertsCount = () => {
    return alerts.filter(alert => alert.type === 'critical' && !alert.resolved).length;
  };
  
  const getAlertsByType = (type: 'all' | 'active' | 'resolved') => {
    if (type === 'active') {
      return alerts.filter(alert => !alert.resolved);
    }
    if (type === 'resolved') {
      return alerts.filter(alert => alert.resolved);
    }
    return alerts;
  };
  
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Alerts & Notifications</h1>
        <p className="text-muted-foreground">
          Monitor and manage alerts across your farm
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <Bell className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                </div>
              </div>
              <BarChart className="h-10 w-10 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Critical Alerts</p>
                  <p className="text-2xl font-bold">{getCriticalAlertsCount()}</p>
                </div>
              </div>
              <BarChart className="h-10 w-10 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{alerts.filter(a => a.resolved).length}</p>
                </div>
              </div>
              <BarChart className="h-10 w-10 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Alerts
              {getActiveAlertsCount() > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {getActiveAlertsCount()} Active
                </Badge>
              )}
            </CardTitle>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resolveAllAlerts}
                disabled={getActiveAlertsCount() === 0}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Resolve All
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="active">
                Active ({getAlertsByType('active').length})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved ({getAlertsByType('resolved').length})
              </TabsTrigger>
              <TabsTrigger value="all">
                All Alerts ({alerts.length})
              </TabsTrigger>
            </TabsList>
            
            {['active', 'resolved', 'all'].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                {getAlertsByType(tabValue as 'all' | 'active' | 'resolved').length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No {tabValue} alerts</p>
                  </div>
                ) : (
                  <>
                    {getAlertsByType(tabValue as 'all' | 'active' | 'resolved').map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`p-4 border rounded-lg ${
                          alert.type === 'critical' ? 'border-red-200 bg-red-50' :
                          alert.type === 'warning' ? 'border-amber-200 bg-amber-50' :
                          'border-blue-200 bg-blue-50'
                        } ${alert.resolved ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5">
                            {getAlertIcon(alert.type, alert.source)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium mr-2">{alert.title}</h3>
                              <Badge variant={
                                alert.type === 'critical' ? 'destructive' :
                                alert.type === 'warning' ? 'default' :
                                'secondary'
                              } className="ml-auto">
                                {alert.type}
                              </Badge>
                            </div>
                            
                            <p className="text-sm mt-1">{alert.message}</p>
                            
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(alert.timestamp)}
                              
                              <div className="mx-2">•</div>
                              
                              <div className="capitalize">{alert.source}</div>
                              
                              {alert.resolved && (
                                <>
                                  <div className="mx-2">•</div>
                                  <span className="flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                    Resolved
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-4 flex space-x-2">
                            {!alert.resolved && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8"
                                onClick={() => resolveAlert(alert.id)}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolve
                              </Button>
                            )}
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-muted-foreground"
                              onClick={() => deleteAlert(alert.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ToggleLeft className="h-5 w-5 mr-2" />
            Notification Settings
          </CardTitle>
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
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alert Types</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <AlertCircle className="h-4 w-4 text-red-500" />
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
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
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
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Alert Sources</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4 p-4 border rounded-md">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Droplet className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Irrigation</p>
                  <p className="text-sm text-muted-foreground">Water levels, pressure, flow rates</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 border rounded-md">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Thermometer className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">Weather</p>
                  <p className="text-sm text-muted-foreground">Temperature, rainfall, wind conditions</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 border rounded-md">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Crops</p>
                  <p className="text-sm text-muted-foreground">Growth, health, pest detection</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 border rounded-md">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <SettingsIcon className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">System</p>
                  <p className="text-sm text-muted-foreground">Hardware, software, maintenance</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
