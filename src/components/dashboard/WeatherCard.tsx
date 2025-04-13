
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherCardProps {
  location: string;
  forecast: {
    today: {
      condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
      temperature: number;
      humidity: number;
      windSpeed: number;
    };
    upcoming: Array<{
      day: string;
      condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
      high: number;
      low: number;
    }>;
  };
}

const weatherIcons = {
  sunny: <Sun className="h-6 w-6 text-amber-500" />,
  cloudy: <Cloud className="h-6 w-6 text-gray-500" />,
  rainy: <CloudRain className="h-6 w-6 text-blue-500" />,
  windy: <Wind className="h-6 w-6 text-cyan-500" />
};

const WeatherCard: React.FC<WeatherCardProps> = ({ location, forecast }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Weather Forecast</span>
          <span className="text-sm font-normal text-muted-foreground">{location}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          {weatherIcons[forecast.today.condition]}
          <div className="ml-4">
            <div className="text-3xl font-bold">{forecast.today.temperature}°C</div>
            <div className="text-muted-foreground">
              Humidity: {forecast.today.humidity}% | Wind: {forecast.today.windSpeed} km/h
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {forecast.upcoming.map((day) => (
            <div key={day.day} className="text-center p-2">
              <div className="text-sm font-medium">{day.day}</div>
              <div className="my-1">{weatherIcons[day.condition]}</div>
              <div className="text-xs">
                <span className="font-medium">{day.high}°</span> / <span className="text-muted-foreground">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
