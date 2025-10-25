
import React from 'react';
import type { FarmData } from '../types';
import { motion } from 'framer-motion';
import { Droplets, Thermometer, Leaf } from 'lucide-react';
import StatCard, { ProgressCircle, PhScale } from './StatCard';

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
  const getMoistureColor = (value: number) => {
    if (value < 30) return 'text-red-500'; // dry
    if (value < 50) return 'text-amber-500'; // moderate
    if (value < 75) return 'text-green-500'; // optimal
    return 'text-blue-500'; // wet
  };

  const stats = [
    {
      title: 'Soil Moisture',
      value: `${farmData.soilMoisture}%`,
      Icon: Droplets,
      color: getMoistureColor(farmData.soilMoisture),
      children: <ProgressCircle percentage={farmData.soilMoisture} color={getMoistureColor(farmData.soilMoisture).replace('text-','bg-')} />
    },
    {
      title: 'Soil pH Level',
      value: farmData.soilPh.toFixed(1),
      Icon: Thermometer,
      color: 'text-neutral-500',
      children: <PhScale value={farmData.soilPh} />
    },
    {
      title: 'Air Quality',
      value: `${farmData.airQuality}%`,
      Icon: Leaf,
      color: 'text-sky-500',
      description: 'Good'
    },
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
