
import React from 'react';
import type { FarmData } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const HistoricalDataChart: React.FC<{ data: FarmData[] }> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    // Format the timestamp for display on the X-axis
    time: format(new Date(item.createdAt), 'HH:mm'), 
  }));

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/30">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Sensor Trends</h2>
      <div className="w-full h-[350px] md:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="time" tickCount={10} interval="preserveStartEnd" />
            <YAxis yAxisId="left" stroke="#4B5563" />
            <YAxis yAxisId="right" orientation="right" stroke="#4B5563" />
            <Tooltip 
                contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '0.5rem'
                }}
            />
            <Legend />
            <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="temperature" 
                name="Temperature (°C)" 
                stroke="#EF4444" 
                strokeWidth={2} 
                dot={false} 
            />
            <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="humidity" 
                name="Humidity (%)" 
                stroke="#3B82F6" 
                strokeWidth={2} 
                dot={false} 
            />
            <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="soilMoisture" 
                name="Soil Moisture (VMC)" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={false} 
            />
             <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="lightIntensity" 
                name="Light Intensity" 
                stroke="#F59E0B" 
                strokeWidth={2} 
                dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoricalDataChart;
