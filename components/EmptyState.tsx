import React from 'react';
import { motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <motion.div
      className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 h-full shadow-md border border-white/30 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WifiOff className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700">Waiting for Data</h3>
      <p className="text-gray-500 mt-2 max-w-sm">
        No sensor data has been received yet. Please ensure your ESP device is powered on, connected to the network, and sending data to Supabase.
      </p>
    </motion.div>
  );
};

export default EmptyState;