import React from 'react';
import type { WeatherData } from '../types';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog } from 'lucide-react';
import CountUp from './CountUp';

const WeatherIcon: React.FC<{ code: number; isDay: number; size: number }> = ({ code, isDay, size }) => {
  const iconProps = { size, className: "text-white" };

  // Weather code mapping from Open-Meteo
  if (code <= 1) return <Sun {...iconProps} />;
  if (code <= 3) return <Cloud {...iconProps} />;
  if (code <= 48) return <CloudFog {...iconProps} />;
  if (code <= 67) return <CloudRain {...iconProps} />;
  if (code <= 77) return <Snowflake {...iconProps} />;
  if (code >= 95) return <CloudLightning {...iconProps} />;

  return <Sun {...iconProps} />;
};

const WeatherHero: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
  const { current } = weatherData;

  return (
    <motion.div 
      className="w-full bg-black/20 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 text-white border border-white/20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <WeatherIcon code={current.weather_code} isDay={current.is_day} size={64} />
          </motion.div>
          <div>
            <p className="text-5xl md:text-6xl font-bold tracking-tighter">
              <CountUp value={current.temperature_2m} />°C
            </p>
            <p className="text-white/80 capitalize">Feels like home</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-x-4 md:gap-x-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 text-white/80">
                    <Droplets size={16} />
                    <span className="text-sm">Humidity</span>
                </div>
                <p className="text-xl font-semibold"><CountUp value={current.relative_humidity_2m} />%</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 text-white/80">
                    <Wind size={16} />
                    <span className="text-sm">Wind</span>
                </div>
                <p className="text-xl font-semibold"><CountUp value={current.wind_speed_10m} /> km/h</p>
            </div>
             <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-1.5 text-white/80">
                    <Thermometer size={16} />
                    <span className="text-sm">UV Index</span>
                </div>
                <p className="text-xl font-semibold"><CountUp value={weatherData.daily.uv_index_max[0]} /></p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherHero;
