
import React from 'react';
import { motion } from 'framer-motion';
import type { LucideProps } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  color?: string;
  description?: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon, color = 'text-gray-700', description, children }) => {
  return (
    <motion.div 
      className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 h-full shadow-md border border-white/30"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className={`${color} h-6 w-6`} />
      </div>
      <div className="flex items-end gap-4">
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
        {description && <p className="text-gray-500 mb-1">{description}</p>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};


export const ProgressCircle: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex items-center justify-center">
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
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-2xl font-bold text-gray-700">{percentage}%</span>
        </div>
    );
};

export const PhScale: React.FC<{ value: number }> = ({ value }) => {
    const percentage = (value / 14) * 100;
    return (
        <div>
            <div className="relative h-3 w-full bg-gradient-to-r from-red-400 via-green-400 to-blue-400 rounded-full">
                <div className="absolute h-full bg-green-200/50 rounded-full" style={{ left: '40%', width: '20%' }}></div>
                <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 h-5 w-1 bg-gray-800 rounded-full ring-2 ring-white"
                    initial={{ left: '0%' }}
                    animate={{ left: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 (Acidic)</span>
                <span>7 (Neutral)</span>
                <span>14 (Alkaline)</span>
            </div>
        </div>
    );
};

export default StatCard;
