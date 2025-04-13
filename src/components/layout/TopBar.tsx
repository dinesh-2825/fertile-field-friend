
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TopBar = () => {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "New alert",
      description: "Soil moisture in Field 3 is below recommended levels.",
      variant: "default",
    });
  };

  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-background">
      <div className="md:w-56">
        <h2 className="font-medium truncate">Smart Farming Assistant</h2>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={showNotification}>
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
