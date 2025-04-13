
import React, { useState, useEffect } from 'react';
import { Droplet, SunMedium, Thermometer, Wind, SeedingIcon } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import WeatherCard from '@/components/dashboard/WeatherCard';
import SoilMoistureCard from '@/components/dashboard/SoilMoistureCard';
import AlertsCard from '@/components/dashboard/AlertsCard';
import CropGrowthCard from '@/components/dashboard/CropGrowthCard';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [temperature, setTemperature] = useState(24.2);
  const [humidity, setHumidity] = useState(62);
  const [soilMoisture, setSoilMoisture] = useState(48);
  const [windSpeed, setWindSpeed] = useState(14);

  // Simulated real-time data updates
  useEffect(() => {
    const updateSensorData = () => {
      // Update temperature: 22-27°C with slow changes
      setTemperature(prev => {
        const newTemp = prev + (Math.random() * 0.4 - 0.2);
        return Math.max(22, Math.min(27, newTemp));
      });
      
      // Update humidity: 55-70% with moderate changes
      setHumidity(prev => {
        const newHumidity = prev + (Math.random() * 2 - 1);
        return Math.max(55, Math.min(70, newHumidity));
      });
      
      // Update soil moisture: 40-60% with slow changes
      setSoilMoisture(prev => {
        const newMoisture = prev + (Math.random() * 1 - 0.5);
        return Math.max(40, Math.min(60, newMoisture));
      });
      
      // Update wind speed: 5-20 km/h with higher variability
      setWindSpeed(prev => {
        const newWind = prev + (Math.random() * 3 - 1.5);
        return Math.max(5, Math.min(20, newWind));
      });
    };

    // Update sensor data every 3 seconds
    const sensorInterval = setInterval(updateSensorData, 3000);
    
    // Generate random alerts
    const alertInterval = setInterval(() => {
      const shouldShowAlert = Math.random() < 0.2; // 20% chance of alert
      
      if (shouldShowAlert) {
        const alerts = [
          "Soil moisture in Field 2 dropping below threshold",
          "Temperature in greenhouse 1 rising quickly",
          "Battery low on sensor unit 5",
          "Irrigation system needs maintenance"
        ];
        
        toast({
          title: "Farm Alert",
          description: alerts[Math.floor(Math.random() * alerts.length)],
          variant: "destructive",
        });
      }
    }, 30000);
    
    return () => {
      clearInterval(sensorInterval);
      clearInterval(alertInterval);
    };
  }, [toast]);

  const weatherForecast = {
    today: {
      condition: 'sunny' as const,
      temperature: Math.round(temperature),
      humidity: Math.round(humidity),
      windSpeed: Math.round(windSpeed)
    },
    upcoming: [
      { day: 'Tue', condition: 'sunny' as const, high: 26, low: 18 },
      { day: 'Wed', condition: 'cloudy' as const, high: 24, low: 17 },
      { day: 'Thu', condition: 'rainy' as const, high: 22, low: 16 },
      { day: 'Fri', condition: 'cloudy' as const, high: 23, low: 17 }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Farm Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and insights for your farm
        </p>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Temperature" 
          value={`${temperature.toFixed(1)}°C`}
          icon={<Thermometer className="h-4 w-4" />}
          trend={{ value: 0.8, isPositive: true }}
          isLive={true}
        />
        <StatCard 
          title="Humidity" 
          value={`${Math.round(humidity)}%`}
          icon={<Droplet className="h-4 w-4" />}
          trend={{ value: 1.2, isPositive: false }}
          isLive={true}
        />
        <StatCard 
          title="Soil Moisture" 
          value={`${Math.round(soilMoisture)}%`}
          icon={<SeedingIcon className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: true }}
          isLive={true}
        />
        <StatCard 
          title="Wind Speed" 
          value={`${Math.round(windSpeed)} km/h`}
          icon={<Wind className="h-4 w-4" />}
          trend={{ value: 3.4, isPositive: false }}
          isLive={true}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <SoilMoistureCard />
          <CropGrowthCard />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <WeatherCard 
            location="Farm Location" 
            forecast={weatherForecast}
          />
          <AlertsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
