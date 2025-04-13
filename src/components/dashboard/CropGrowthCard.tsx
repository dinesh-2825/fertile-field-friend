
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface CropGrowthCardProps {
  className?: string;
}

const CropGrowthCard: React.FC<CropGrowthCardProps> = ({ className }) => {
  const [data, setData] = useState([
    { name: 'Week 1', corn: 5, wheat: 3, soybean: 4 },
    { name: 'Week 2', corn: 15, wheat: 11, soybean: 13 },
    { name: 'Week 3', corn: 25, wheat: 18, soybean: 22 },
    { name: 'Week 4', corn: 38, wheat: 27, soybean: 32 },
    { name: 'Week 5', corn: 52, wheat: 38, soybean: 45 },
    { name: 'Week 6', corn: 65, wheat: 48, soybean: 58 },
  ]);

  // Simulate growth updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        // Add small random growth to the last week
        const lastWeekIndex = prev.length - 1;
        const updated = [...prev];
        
        updated[lastWeekIndex] = {
          ...updated[lastWeekIndex],
          corn: updated[lastWeekIndex].corn + (Math.random() * 2 - 0.5),
          wheat: updated[lastWeekIndex].wheat + (Math.random() * 1.5 - 0.5),
          soybean: updated[lastWeekIndex].soybean + (Math.random() * 1.8 - 0.5),
        };
        
        return updated;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Crop Growth Progress</span>
          <span className="ml-2 text-xs text-muted-foreground font-normal">(cm)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="corn"
                name="Corn"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="wheat"
                name="Wheat"
                stroke="#FBBF24"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="soybean"
                name="Soybean"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropGrowthCard;
