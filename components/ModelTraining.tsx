import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, BrainCircuit, Leaf, CheckCircle } from 'lucide-react';

// --- Static Data for Demonstration ---
const DUMMY_CROP_RECOMMENDATIONS = [
  { cropName: 'Tomato (Tamatar)', rationale: 'Well-suited for the current temperature range and soil conditions.', growingSeason: 'Rabi/Summer', difficulty: 'Moderate' },
  { cropName: 'Okra (Bhindi)', rationale: 'Thrives in high light and warm conditions.', growingSeason: 'Kharif', difficulty: 'Easy' },
  { cropName: 'Brinjal (Baingan)', rationale: 'Resilient crop with good market demand, matches humidity levels.', growingSeason: 'All year', difficulty: 'Moderate' },
  { cropName: 'Mango (Aam)', rationale: 'Long-term fruit crop ideal for the regional climate of Punjab.', growingSeason: 'Summer', difficulty: 'Hard' },
];

const TRAINING_LOGS = [
  { text: 'Booting AgriSuggest AI v3.0...', status: 'running' },
  { text: 'Connecting to farm sensor network...', status: 'running' },
  { text: 'Received real-time data packet: {temp: 28.5, humid: 65, soil: 40.95, light: 850}', status: 'running' },
  { text: 'Initializing Tensor Core for model inference...', status: 'running' },
  { text: 'Loading pre-trained model: "punjab_crop_yield_v3.2.h5"', status: 'running' },
  { text: 'Model loaded successfully. Analyzing parameters...', status: 'running' },
  { text: 'Executing feature scaling on input data...', status: 'running' },
  { text: 'Running prediction algorithm...', status: 'running' },
  { text: 'Cross-referencing results with historical yield database...', status: 'running' },
  { text: 'Finalizing recommendations...', status: 'running' },
  { text: 'Process complete. Outputting results.', status: 'success' },
];

// --- The Dummy Component ---

const DummyRecommendationEngine: React.FC = () => {
  const [logs, setLogs] = useState<{ text: string, status: string }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentLogIndex = 0;
    const timeouts: NodeJS.Timeout[] = [];

    const processNextLog = () => {
      if (currentLogIndex < TRAINING_LOGS.length) {
        const logItem = TRAINING_LOGS[currentLogIndex];
        const timeout = setTimeout(() => {
          setLogs(prevLogs => [...prevLogs, logItem]);
          if (logItem.status === 'success') {
            const successTimeout = setTimeout(() => setIsComplete(true), 1000);
            timeouts.push(successTimeout);
          }
          currentLogIndex++;
          processNextLog();
        }, 300 + Math.random() * 200); // Add some randomness to timing
        timeouts.push(timeout);
      }
    };

    processNextLog();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-8 font-sans text-white flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="flex items-center gap-4 mb-6 border-b border-green-500/30 pb-4">
          <BrainCircuit size={40} className="text-green-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">AI Crop Recommendation Engine</h1>
            <p className="text-green-400/80 font-mono">Live Simulation Feed</p>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Training Log Section */}
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-green-400 h-[500px] overflow-y-auto border border-green-500/20">
            <div className="flex items-center gap-2 mb-4 text-gray-400 sticky top-0 bg-black/50 py-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="ml-2">/var/log/agrisuggest_ai.log</span>
            </div>
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start"
                >
                  <span className="text-gray-500 mr-2">{`>`}</span>
                  <span className="flex-1">{log.text}</span>
                  {log.status === 'running' && <Loader size={16} className="animate-spin text-yellow-500" />}
                  {log.status === 'success' && <CheckCircle size={16} className="text-green-500" />}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>

          {/* Results Section */}
          <div className="bg-black/50 rounded-lg p-6 border border-green-500/20">
            <h2 className="text-2xl font-semibold mb-4 text-white">Generated Recommendations</h2>
            <AnimatePresence>
              {!isComplete ? (
                <motion.div key="waiting" className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Loader size={32} className="animate-spin mb-4" />
                  <p>Awaiting model output...</p>
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="space-y-4">
                    {DUMMY_CROP_RECOMMENDATIONS.map((rec, index) => (
                      <motion.div
                        key={rec.cropName}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.2 }}
                        className="bg-green-500/10 p-4 rounded-md border border-green-500/30"
                      >
                        <div className="flex items-center gap-3">
                            <Leaf className="text-green-400"/>
                            <h3 className="text-lg font-bold text-green-300">{rec.cropName}</h3>
                        </div>
                        <p className="text-sm text-gray-300 mt-1 pl-8">{rec.rationale}</p>
                        <div className="flex items-center gap-4 mt-2 pl-8 text-xs">
                           <span className="bg-gray-700 px-2 py-1 rounded">Season: {rec.growingSeason}</span>
                           <span className="bg-gray-700 px-2 py-1 rounded">Difficulty: {rec.difficulty}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DummyRecommendationEngine;
