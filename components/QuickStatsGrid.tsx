import React from 'react';
import type { FarmData } from '../types';
import { motion } from 'framer-motion';
import { Droplets, Thermometer, Leaf, Sun } from 'lucide-react';
import StatCard, { ProgressCircle, LightLevelIndicator } from './StatCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const QuickStatsGrid: React.FC<{ farmData: FarmData }> = ({ farmData }) => {

  const stats = [
    {
      title: 'Air Temperature',
      value: farmData.temperature,
      decimals: 1,
      suffix: '°C',
      Icon: Thermometer,
      color: 'text-orange-500',
      description: 'Stable',
    },
    {
      title: 'Air Humidity',
      value: farmData.humidity,
      suffix: 'φ',
      Icon: Droplets,
      color: 'text-sky-500',
      children: <ProgressCircle percentage={farmData.humidity} color={'bg-sky-500'} />
    },
    {
      title: 'Soil Moisture',
      value: farmData.soilMoisture,
      suffix: ' VMC',
      Icon: Leaf,
      color: 'text-green-500',
      children: <ProgressCircle percentage={farmData.soilMoisture} color={'bg-green-500'} />
    },
    {
      title: 'Light Intensity',
      value: farmData.lightIntensity,
      suffix: 'Lm',
      Icon: Sun,
      color: 'text-amber-500',
      children: <LightLevelIndicator level={farmData.lightIntensity} />
    },
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <StatCard {...stat} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickStatsGrid;