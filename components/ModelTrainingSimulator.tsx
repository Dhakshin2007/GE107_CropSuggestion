import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SENSOR DATA FOR DEMONSTRATION ---
const SENSOR_DATA = {
  temperature: 28.7,
  humidity: 62.5,
  lightIntensity: 850,
  soilMoistureRaw: 4095,
  soilMoistureScaled: 40.95,
};

// --- Real time TRAINING LOGS ---
const TRAINING_LOGS = [
  `[INFO] Initializing AgriSuggest AI Training Cycle v2.1...`,
  `[INFO] Authenticating with cloud GPU services... OK`,
  `[INFO] Loading dataset: "Punjab_AgroClimatic_Historical_v4.2.csv" (2.8M rows)`,
  `[DATA] Preprocessing real-time sensor inputs...`,
  `       > Temperature: ${SENSOR_DATA.temperature}°C`,
  `       > Humidity: ${SENSOR_DATA.humidity}%`,
  `       > Light Intensity: ${SENSOR_DATA.lightIntensity} lux`,
  `       > Soil Moisture (Raw): ${SENSOR_DATA.soilMoistureRaw} -> (Scaled): ${SENSOR_DATA.soilMoistureScaled}%`,
  `[MODEL] Performing feature engineering: creating seasonal & diurnal features...`,
  `[MODEL] Building model architecture: Recurrent Neural Network (RNN) with LSTM layers.`,
  `[TRAIN] Starting model training cycle...`,
  `        > Epoch 1/5 | Loss: 0.8512, Accuracy: 78.5%`,
  `        > Epoch 2/5 | Loss: 0.7245, Accuracy: 82.1%`,
  `        > Epoch 3/5 | Loss: 0.6133, Accuracy: 85.7%`,
  `        > Epoch 4/5 | Loss: 0.5489, Accuracy: 88.3%`,
  `        > Epoch 5/5 | Loss: 0.5102, Accuracy: 90.4%`,
  `[INFO] Model has converged. Validation accuracy: 91.2%`,
  `[SUCCESS] Training complete. Model saved as 'punjab_crop_model_latest.h5'`,
];

/**
 * This is a non-functional, standalone component for demonstration purposes.
 * It simulates an AI model training feed.
 * It is not used in the main application and has no effect on its performance or logic.
 */
const ModelTrainingSimulator: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < TRAINING_LOGS.length) {
        setLogs(prevLogs => [...prevLogs, TRAINING_LOGS[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 400); // Simulate a new log entry every 400ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1E1E1E] text-[#D4D4D4] font-mono p-6 rounded-lg shadow-2xl border border-gray-700 w-full max-w-2xl mx-auto my-8">
      <div className="flex items-center pb-3 border-b border-gray-700 mb-3">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <p className="text-sm">bash -- Model Training Feed</p>
      </div>
      <div className="h-96 overflow-y-auto pr-2">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-green-400 mr-2">$</span>
              <span className="whitespace-pre-wrap">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModelTrainingSimulator;
