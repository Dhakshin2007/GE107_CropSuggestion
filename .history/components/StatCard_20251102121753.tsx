import React from 'react';
import { motion } from 'framer-motion';
import type { LucideProps } from 'lucide-react';
import CountUp from './CountUp';

interface StatCardProps {
  title: string;
  value: string | number;
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  color?: string;
  description?: string;
  children?: React.ReactNode;
  suffix?: string;
  decimals?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon, color = 'text-gray-700', description, children, suffix = '', decimals = 0 }) => {
  return (
    <motion.div 
      className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 h-full shadow-md border border-white/30 flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className={`${color} h-6 w-6`} />
      </div>
      <div className="flex items-end gap-x-2">
        <p className={`text-4xl font-bold ${color}`}>
          {typeof value === 'number' ? <CountUp value={value} decimals={decimals} /> : value}
          {suffix}
        </p>
        {description && <p className="text-gray-500 mb-1">{description}</p>}
      </div>
      {children && <div className="mt-4 flex-grow flex items-center">{children}</div>}
    </motion.div>
  );
};


export const ProgressCircle: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-full flex items-center justify-center h-[120px]">
            <svg className="transform -rotate-90" width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} stroke="currentColor" strokeWidth="10" className="text-gray-200" fill="transparent" />
                <motion.circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    className={color.replace('bg-','text-')}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute text-2xl font-bold text-gray-700">
                <CountUp value={percentage} />%
            </div>
        </div>
    );
};

export const LightLevelIndicator: React.FC<{ level: number }> = ({ level }) => {
    // Assuming level is a percentage from 0 to 100
    const percentage = Math.min(100, Math.max(0, level));
    return (
        <div className="w-full">
            <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                    className="absolute h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Dim</span>
                <span>Bright</span>
            </div>
        </div>
    );
};


export default StatCard;