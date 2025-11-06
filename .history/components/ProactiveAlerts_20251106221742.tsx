
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Wind, CloudRain, Droplets, Thermometer, X } from 'lucide-react';
import type { FarmData, WeatherData, Alert } from '../types';

interface ProactiveAlertsProps {
  farmData: FarmData | null;
  weatherData: WeatherData | null;
  historicalData: FarmData[];
}

const alertConfig = {
  warning: {
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-700',
  },
  danger: {
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
  },
  info: {
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-700',
  },
};

const ProactiveAlerts: React.FC<ProactiveAlertsProps> = ({ farmData, weatherData, historicalData }) => {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (!farmData || !weatherData) return;
    
    const newAlerts: Alert[] = [];

    // 1. Heat Stress Alert
    if (weatherData.daily.temperature_2m_max[0] > 38) {
      newAlerts.push({
        id: 'heat_stress',
        type: 'warning',
        title: 'Heat Stress Warning',
        message: `High temperatures above 38°C are expected today. Ensure crops are adequately watered to prevent dehydration.`
      });
    }

    // 2. High Wind Alert
    if (weatherData.current.wind_speed_10m > 25) {
      newAlerts.push({
        id: 'high_wind',
        type: 'warning',
        title: 'High Wind Alert',
        message: `Strong winds of ${weatherData.current.wind_speed_10m.toFixed(1)} km/h detected. Check on young plants and support structures.`
      });
    }

    // 3. Heavy Rain Forecast
    if (weatherData.daily.precipitation_probability_max[0] > 80) {
      newAlerts.push({
        id: 'heavy_rain',
        type: 'info',
        title: 'Heavy Rain Forecast',
        message: `There's a ${weatherData.daily.precipitation_probability_max[0]}% probability of heavy rain today. Ensure proper drainage.`
      });
    }

    // 4. Rapid Soil Moisture Drop Alert
    if (historicalData.length >= 5) {
      const currentMoisture = farmData.soilMoisture;
      const recentHistory = historicalData.slice(-5, -1); // Use 4 previous points
      if (recentHistory.length > 0) {
          const avgPreviousMoisture = recentHistory.reduce((sum, d) => sum + d.soilMoisture, 0) / recentHistory.length;
    
          if (currentMoisture < avgPreviousMoisture * 0.8) { // 20% drop
            newAlerts.push({
              id: 'soil_moisture_drop',
              type: 'danger',
              title: 'Rapid Soil Dehydration',
              message: `Soil moisture has dropped significantly compared to recent levels. Immediate irrigation may be required.`
            });
          }
      }
    }

    setActiveAlerts(newAlerts);
  }, [farmData, weatherData, historicalData]);
  
  const handleDismiss = (id: string) => {
    setDismissedAlerts(prev => [...prev, id]);
  };

  const visibleAlerts = useMemo(() => {
      return activeAlerts.filter(alert => !dismissedAlerts.includes(alert.id));
  }, [activeAlerts, dismissedAlerts]);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {visibleAlerts.map(alert => {
            const config = alertConfig[alert.type];
            let icon;
            switch(alert.id) {
                case 'high_wind': icon = <Wind className="h-6 w-6 text-yellow-500" />; break;
                case 'heavy_rain': icon = <CloudRain className="h-6 w-6 text-blue-500" />; break;
                case 'soil_moisture_drop': icon = <Droplets className="h-6 w-6 text-red-500" />; break;
                case 'heat_stress': icon = <Thermometer className="h-6 w-6 text-yellow-500" />; break;
                default: icon = <AlertTriangle className="h-6 w-6" />;
            }

            return (
                <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`${config.bgColor} border-l-4 ${config.borderColor} ${config.textColor} p-4 rounded-r-lg shadow-lg flex items-start gap-4`}
                >
                    <div className="flex-shrink-0 pt-0.5">
                        {icon}
                    </div>
                    <div className="flex-grow">
                        <p className="font-bold">{alert.title}</p>
                        <p className="text-sm">{alert.message}</p>
                    </div>
                    <button onClick={() => handleDismiss(alert.id)} className="flex-shrink-0 p-1 -mt-1 -mr-1 rounded-full hover:bg-black/10 transition-colors" aria-label={`Dismiss alert: ${alert.title}`}>
                        <X size={18} />
                    </button>
                </motion.div>
            );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ProactiveAlerts;
