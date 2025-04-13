
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface SoilMoistureCardProps {
  className?: string;
}

const SoilMoistureCard: React.FC<SoilMoistureCardProps> = ({ className }) => {
  const [data, setData] = useState([
    { field: 'Field 1', moisture: 42 },
    { field: 'Field 2', moisture: 68 },
    { field: 'Field 3', moisture: 27 },
    { field: 'Field 4', moisture: 55 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => 
        prev.map(item => ({
          ...item,
          moisture: Math.max(20, Math.min(80, item.moisture + (Math.random() * 6 - 3)))
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getMoistureColor = (value: number) => {
    if (value < 30) return '#EF4444'; // Too dry
    if (value > 70) return '#3B82F6'; // Too wet
    return '#10B981'; // Optimal
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Soil Moisture</span>
          <span className="ml-2 text-xs text-muted-foreground font-normal">(Live Data)</span>
          <span className="ml-2 relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="field" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Moisture']}
                labelFormatter={(label) => `Field: ${label}`}
              />
              <Bar
                dataKey="moisture"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                barSize={40}
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 text-xs text-center">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mb-1"></div>
            <span>Too Dry (&lt;30%)</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
            <span>Optimal (30-70%)</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mb-1"></div>
            <span>Too Wet (&gt;70%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilMoistureCard;
