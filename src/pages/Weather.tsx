
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  SunMedium, 
  Cloud, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplet, 
  Umbrella,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Simulated hourly forecast data
const generateHourlyForecast = () => {
  const hours = [];
  const now = new Date();
  now.setMinutes(0, 0, 0);
  
  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Generate realistic temperature pattern (cooler at night, warmer during day)
    let baseTemp = 22;
    if (hour >= 0 && hour < 6) baseTemp = 18; // Early morning
    else if (hour >= 6 && hour < 12) baseTemp = 20 + (hour - 6); // Morning warming
    else if (hour >= 12 && hour < 18) baseTemp = 24 - (hour - 12) * 0.5; // Afternoon cooling
    else baseTemp = 21 - (hour - 18) * 0.5; // Evening cooling
    
    // Add some randomness
    const temp = baseTemp + (Math.random() * 2 - 1);
    
    // Humidity is inverse to temperature during the day
    const humidity = 70 - ((temp - 18) * 2) + (Math.random() * 10 - 5);
    
    // Wind speed with some randomness
    const windSpeed = 8 + (Math.random() * 6 - 3);
    
    // Chance of rain increases with humidity
    const rainChance = Math.max(0, Math.min(100, humidity - 40 + (Math.random() * 20 - 10)));
    
    hours.push({
      time: hour.toString().padStart(2, '0') + ':00',
      temp: temp.toFixed(1),
      humidity: Math.round(humidity),
      windSpeed: windSpeed.toFixed(1),
      rainChance: Math.round(rainChance),
    });
  }
  
  return hours;
};

// Simulated daily forecast data
const dailyForecast = [
  { day: 'Today', condition: 'sunny', high: 26, low: 18, rainChance: 10 },
  { day: 'Tomorrow', condition: 'cloudy', high: 24, low: 17, rainChance: 30 },
  { day: 'Wed', condition: 'rainy', high: 22, low: 16, rainChance: 80 },
  { day: 'Thu', condition: 'cloudy', high: 23, low: 17, rainChance: 40 },
  { day: 'Fri', condition: 'sunny', high: 25, low: 18, rainChance: 5 },
  { day: 'Sat', condition: 'sunny', high: 27, low: 19, rainChance: 0 },
  { day: 'Sun', condition: 'cloudy', high: 25, low: 18, rainChance: 20 },
];

// Weather condition icons
const weatherIcons = {
  sunny: <SunMedium className="h-12 w-12 text-amber-500" />,
  cloudy: <Cloud className="h-12 w-12 text-gray-500" />,
  rainy: <CloudRain className="h-12 w-12 text-blue-500" />,
  windy: <Wind className="h-12 w-12 text-cyan-500" />
};

const Weather = () => {
  const [hourlyForecast, setHourlyForecast] = useState(generateHourlyForecast());
  const [weatherAlerts, setWeatherAlerts] = useState([
    {
      id: 1,
      type: 'Strong Wind',
      description: 'Strong winds expected tomorrow afternoon',
      time: 'Tue, 4:00 PM - 8:00 PM',
      severity: 'moderate'
    }
  ]);
  
  // Update hourly forecast data every 30 seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHourlyForecast(prev => prev.map((hour, index) => {
        if (index < 5) { // Only update the next few hours to simulate real forecast changes
          return {
            ...hour,
            temp: (parseFloat(hour.temp) + (Math.random() * 0.4 - 0.2)).toFixed(1),
            humidity: Math.max(30, Math.min(90, hour.humidity + (Math.random() * 4 - 2))),
            windSpeed: (parseFloat(hour.windSpeed) + (Math.random() * 0.6 - 0.3)).toFixed(1),
            rainChance: Math.max(0, Math.min(100, hour.rainChance + (Math.random() * 6 - 3))),
          };
        }
        return hour;
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to determine if we should show a weather concern
  const getWeatherConcern = () => {
    const highTemp = Math.max(...hourlyForecast.slice(0, 12).map(h => parseFloat(h.temp)));
    const highWind = Math.max(...hourlyForecast.slice(0, 12).map(h => parseFloat(h.windSpeed)));
    const highRain = Math.max(...hourlyForecast.slice(0, 12).map(h => h.rainChance));
    
    if (highTemp > 30) return { type: 'Heat', message: 'High temperatures may stress crops' };
    if (highWind > 12) return { type: 'Wind', message: 'Strong winds may affect fieldwork' };
    if (highRain > 70) return { type: 'Rain', message: 'Heavy rain may cause field saturation' };
    return null;
  };
  
  const concern = getWeatherConcern();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Weather Forecast</h1>
        <p className="text-muted-foreground">
          Detailed weather information for your farm location
        </p>
      </div>
      
      {/* Current conditions card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              {weatherIcons.sunny}
              <div className="ml-4">
                <h2 className="text-3xl font-bold">{hourlyForecast[0].temp}°C</h2>
                <p className="text-muted-foreground">Farm Location</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Droplet className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-sm font-medium">{hourlyForecast[0].humidity}%</div>
                <div className="text-xs text-muted-foreground">Humidity</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Wind className="h-6 w-6 text-cyan-500" />
                </div>
                <div className="text-sm font-medium">{hourlyForecast[0].windSpeed} km/h</div>
                <div className="text-xs text-muted-foreground">Wind</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Umbrella className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-sm font-medium">{hourlyForecast[0].rainChance}%</div>
                <div className="text-xs text-muted-foreground">Rain</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Weather concern alert (conditional) */}
      {concern && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">{concern.type} Advisory</h3>
                <p className="text-amber-700">{concern.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Tabs for different forecast views */}
      <Tabs defaultValue="hourly">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
          <TabsTrigger value="daily">7-Day Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hourly" className="space-y-6">
          {/* Hourly forecast chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Temperature (24 hours)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={hourlyForecast}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" domain={[15, 30]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="temp" 
                      name="Temperature (°C)" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="rainChance" 
                      name="Rain Chance (%)" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Hourly details table */}
          <Card>
            <CardHeader>
              <CardTitle>Hourly Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <div className="flex space-x-6 pb-4 overflow-x-auto">
                    {hourlyForecast.slice(0, 12).map((hour, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 min-w-[70px]">
                        <div className="text-sm font-medium">{hour.time}</div>
                        {parseFloat(hour.temp) > 25 ? (
                          <SunMedium className="h-6 w-6 text-amber-500" />
                        ) : hour.rainChance > 50 ? (
                          <CloudRain className="h-6 w-6 text-blue-500" />
                        ) : (
                          <Cloud className="h-6 w-6 text-gray-500" />
                        )}
                        <div className="text-sm font-bold">{hour.temp}°</div>
                        <div className="text-xs text-blue-500">{hour.rainChance}%</div>
                        <div className="text-xs text-gray-500">{hour.windSpeed} km/h</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="daily" className="space-y-6">
          {/* 7-day forecast */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 divide-y">
                {dailyForecast.map((day, index) => (
                  <div key={index} className="py-4 grid grid-cols-4 items-center">
                    <div className="font-medium">{day.day}</div>
                    <div className="flex justify-center">
                      {weatherIcons[day.condition as keyof typeof weatherIcons]}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-sm font-medium">{day.high}° / {day.low}°</div>
                      <div className="text-xs text-muted-foreground">High / Low</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Umbrella className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm">{day.rainChance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Weather alerts */}
      {weatherAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              <span>Weather Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weatherAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className="p-4 border rounded-md flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-medium">{alert.type}</h3>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs uppercase font-bold ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-800' : 
                    alert.severity === 'moderate' ? 'bg-amber-100 text-amber-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.severity}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Weather;
