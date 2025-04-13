import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Droplet, Clock, Calendar, ToggleLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const FIELDS = [
  { id: 1, name: 'North Field', crop: 'Corn', area: '12.5 acres', moisture: 42 },
  { id: 2, name: 'East Field', crop: 'Wheat', area: '8.3 acres', moisture: 61 },
  { id: 3, name: 'South Field', crop: 'Soybean', area: '10.1 acres', moisture: 27 },
  { id: 4, name: 'West Field', crop: 'Potatoes', area: '6.7 acres', moisture: 53 },
];

const Irrigation = () => {
  const { toast } = useToast();
  const [fields, setFields] = useState(FIELDS);
  const [activeIrrigation, setActiveIrrigation] = useState<number[]>([]);
  const [autoMode, setAutoMode] = useState(true);

  // Simulate changing moisture levels
  useEffect(() => {
    const interval = setInterval(() => {
      setFields(prev => 
        prev.map(field => {
          // If irrigation is active, increase moisture
          if (activeIrrigation.includes(field.id)) {
            return {
              ...field,
              moisture: Math.min(80, field.moisture + (Math.random() * 2))
            };
          }
          // Otherwise slightly decrease moisture
          return {
            ...field,
            moisture: Math.max(20, field.moisture - (Math.random() * 0.5))
          };
        })
      );
      
      // Auto-mode logic: start irrigation if moisture is below 35%
      if (autoMode) {
        fields.forEach(field => {
          if (field.moisture < 35 && !activeIrrigation.includes(field.id)) {
            startIrrigation(field.id);
            toast({
              title: "Auto-Irrigation Activated",
              description: `Irrigation started in ${field.name} due to low moisture levels.`,
              variant: "default",
            });
          }
          // Stop irrigation if moisture is above 65% in auto mode
          else if (field.moisture > 65 && activeIrrigation.includes(field.id)) {
            stopIrrigation(field.id);
            toast({
              title: "Auto-Irrigation Stopped",
              description: `Irrigation stopped in ${field.name} as optimal moisture reached.`,
              variant: "default",
            });
          }
        });
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [fields, activeIrrigation, autoMode, toast]);

  const startIrrigation = (fieldId: number) => {
    if (!activeIrrigation.includes(fieldId)) {
      setActiveIrrigation(prev => [...prev, fieldId]);
      toast({
        title: "Irrigation Started",
        description: `Irrigation system activated for Field ${fieldId}.`,
      });
    }
  };

  const stopIrrigation = (fieldId: number) => {
    setActiveIrrigation(prev => prev.filter(id => id !== fieldId));
  };

  const toggleAutoMode = () => {
    setAutoMode(prev => !prev);
    toast({
      title: `Auto-Irrigation ${!autoMode ? 'Enabled' : 'Disabled'}`,
      description: !autoMode 
        ? "System will automatically manage irrigation based on soil moisture." 
        : "Manual control mode activated.",
    });
  };

  const getMoistureColor = (value: number) => {
    if (value < 30) return 'bg-red-500';
    if (value > 70) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Irrigation Management</h1>
        <p className="text-muted-foreground">
          Monitor and control irrigation systems across your fields
        </p>
      </div>
      
      {/* Auto-mode switch */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ToggleLeft size={20} />
              <div>
                <h3 className="font-medium">Automatic Irrigation</h3>
                <p className="text-sm text-muted-foreground">
                  System will manage irrigation based on soil moisture thresholds
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-mode">
                {autoMode ? 'Enabled' : 'Disabled'}
              </Label>
              <Switch 
                id="auto-mode" 
                checked={autoMode} 
                onCheckedChange={toggleAutoMode} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Fields grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <Card key={field.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{field.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>Crop: {field.crop}</div>
                <div>Area: {field.area}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Soil Moisture</Label>
                  <span className="font-medium">{Math.round(field.moisture)}%</span>
                </div>
                <Progress 
                  value={field.moisture} 
                  className={getMoistureColor(field.moisture)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Too Dry</span>
                  <span>Optimal</span>
                  <span>Too Wet</span>
                </div>
              </div>

              <div className="flex space-x-4 pt-2">
                {activeIrrigation.includes(field.id) ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => stopIrrigation(field.id)}
                  >
                    Stop Irrigation
                  </Button>
                ) : (
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => startIrrigation(field.id)}
                    disabled={autoMode}
                  >
                    Start Irrigation
                  </Button>
                )}
              </div>
              
              {activeIrrigation.includes(field.id) && (
                <div className="flex items-center text-green-500 text-sm justify-center animate-pulse">
                  <Droplet size={16} className="mr-1" />
                  <span>Irrigation active</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Irrigation Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-md">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Morning Cycle</p>
                  <p className="text-sm text-muted-foreground">Daily at 6:00 AM • All Fields</p>
                </div>
              </div>
              <Switch checked disabled={autoMode} />
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-md">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="font-medium">Evening Cycle</p>
                  <p className="text-sm text-muted-foreground">Daily at 6:00 PM • All Fields</p>
                </div>
              </div>
              <Switch checked disabled={autoMode} />
            </div>
            
            <Button variant="outline" className="w-full" disabled={autoMode}>
              Add New Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Irrigation;
