
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  message: string;
  type: 'warning' | 'critical' | 'info';
  timestamp: Date;
  resolved: boolean;
}

interface AlertsCardProps {
  className?: string;
}

const AlertsCard: React.FC<AlertsCardProps> = ({ className }) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      message: 'Soil moisture in Field 3 below threshold',
      type: 'warning',
      timestamp: new Date(Date.now() - 25 * 60000),
      resolved: false
    },
    {
      id: '2',
      message: 'Irrigation system malfunction in Field 2',
      type: 'critical',
      timestamp: new Date(Date.now() - 55 * 60000),
      resolved: false
    },
    {
      id: '3',
      message: 'Weather alert: Strong winds expected',
      type: 'info',
      timestamp: new Date(Date.now() - 125 * 60000),
      resolved: true
    }
  ]);

  // Add a simulated alert every 40 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessages = [
        'Temperature spike detected in greenhouse',
        'Pest activity detected in Field 1',
        'Battery low on sensor unit 3',
        'Nitrogen levels below optimal in Field 4'
      ];
      
      const types: ('warning' | 'critical' | 'info')[] = ['warning', 'critical', 'info'];
      
      const newAlert: Alert = {
        id: Date.now().toString(),
        message: newMessages[Math.floor(Math.random() * newMessages.length)],
        type: types[Math.floor(Math.random() * types.length)],
        timestamp: new Date(),
        resolved: false
      };
      
      setAlerts(prev => [newAlert, ...prev].slice(0, 6));
    }, 40000);
    
    return () => clearInterval(interval);
  }, []);

  const resolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    );
  };

  const getAlertIcon = (type: Alert['type'], resolved: boolean) => {
    if (resolved) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const hours = Math.floor(diffMinutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Recent Alerts</span>
          {alerts.some(a => !a.resolved) && (
            <span className="ml-2 relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "flex items-start p-3 rounded-md",
                alert.resolved ? "bg-muted/50" : "bg-muted"
              )}
            >
              <div className="mr-2 mt-0.5">
                {getAlertIcon(alert.type, alert.resolved)}
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  alert.resolved && "text-muted-foreground"
                )}>
                  {alert.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(alert.timestamp)}
                </p>
              </div>
              {!alert.resolved && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={() => resolveAlert(alert.id)}
                >
                  Resolve
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
