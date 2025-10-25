
import React, { useState } from 'react';
import type { WeatherData } from '../types';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ForecastIcon: React.FC<{ code: number; className?: string }> = ({ code, className }) => {
  const iconProps = { className: `h-8 w-8 ${className}` };
  if (code <= 1) return <Sun {...iconProps} />;
  if (code <= 3) return <Cloud {...iconProps} />;
  if (code <= 48) return <CloudFog {...iconProps} />;
  if (code <= 67) return <CloudRain {...iconProps} />;
  if (code <= 77) return <Snowflake {...iconProps} />;
  if (code >= 95) return <CloudLightning {...iconProps} />;
  return <Sun {...iconProps} />;
};

const SevenDayForecast: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
  const { daily } = weatherData;

  const forecastData = daily.time.map((t, i) => ({
    name: format(new Date(t), 'EEE'),
    date: format(new Date(t), 'MMM d'),
    maxTemp: daily.temperature_2m_max[i],
    minTemp: daily.temperature_2m_min[i],
    code: daily.weather_code[i],
    precip: daily.precipitation_probability_max[i],
  }));

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/30">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
      <div className="flex overflow-x-auto space-x-4 mb-6 pb-4">
        {forecastData.map((day, index) => (
          <motion.div 
            key={index}
            className="flex-shrink-0 w-28 text-center bg-white/60 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <p className="font-semibold text-gray-700">{day.name}</p>
            <p className="text-xs text-gray-500 mb-2">{day.date}</p>
            <ForecastIcon code={day.code} className="mx-auto text-sky-500" />
            <p className="font-bold text-lg mt-2">{Math.round(day.maxTemp)}°</p>
            <p className="text-sm text-gray-500">{Math.round(day.minTemp)}°</p>
          </motion.div>
        ))}
      </div>
      
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0.5rem'
            }}/>
            <Legend />
            <Line type="monotone" dataKey="maxTemp" name="Max Temp" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="minTemp" name="Min Temp" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SevenDayForecast;
