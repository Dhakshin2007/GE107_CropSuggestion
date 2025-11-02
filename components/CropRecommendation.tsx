import React, { useState, useMemo } from 'react';
import type { CropRecommendationData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Leaf, BarChart2, Calendar, TrendingUp, Loader, AlertTriangle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const DifficultyBadge: React.FC<{ difficulty: 'Easy' | 'Moderate' | 'Hard' }> = ({ difficulty }) => {
  const config = {
    Easy: { text: 'Easy', color: 'bg-green-100 text-green-800' },
    Moderate: { text: 'Moderate', color: 'bg-yellow-100 text-yellow-800' },
    Hard: { text: 'Hard', color: 'bg-red-100 text-red-800' },
  };
  const { text, color } = config[difficulty] || config.Moderate;
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>{text}</span>;
};

const RecommendationItem: React.FC<{ rec: CropRecommendationData, onToggle: () => void, isExpanded: boolean }> = ({ rec, onToggle, isExpanded }) => {
  return (
    <div className="bg-white/70 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
      <button onClick={onToggle} className="w-full text-left p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isExpanded ? 'bg-green-500' : 'bg-gray-200'} transition-colors`}>
            <Leaf className={isExpanded ? 'text-white' : 'text-green-600'} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{rec.cropName}</h3>
            <p className="text-sm text-gray-500">Suitability Score: <span className="font-bold text-gray-700 font-mono">{rec.suitabilityScore}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <DifficultyBadge difficulty={rec.difficulty} />
            <ChevronDown size={24} className={`text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="px-4 pb-4"
          >
            <div className="border-t pt-4 space-y-3">
              <p className="text-sm text-gray-600 italic">"{rec.rationale}"</p>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} className="text-blue-500"/>
                <strong>Growing Season:</strong> {rec.growingSeason}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2">
                 <div className="bg-blue-100/50 p-2 rounded-lg"><p className="font-bold text-blue-600">{rec.comparisonMetrics['Water Need']}/10</p><p className="text-xs text-blue-500">Water Need</p></div>
                 <div className="bg-amber-100/50 p-2 rounded-lg"><p className="font-bold text-amber-600">{rec.comparisonMetrics['Market Value']}/10</p><p className="text-xs text-amber-500">Market Value</p></div>
                 <div className="bg-red-100/50 p-2 rounded-lg"><p className="font-bold text-red-600">{rec.comparisonMetrics['Pest Resistance']}/10</p><p className="text-xs text-red-500">Pest Resistance</p></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ComparisonChart: React.FC<{ data: CropRecommendationData[] }> = ({ data }) => {
    const chartData = useMemo(() => {
        const metrics = ['Water Need', 'Market Value', 'Pest Resistance'];
        const chartFormattedData = metrics.map(metric => {
            const entry: { [key: string]: string | number } = { subject: metric };
            data.forEach(rec => {
                entry[rec.cropName] = rec.comparisonMetrics[metric as keyof typeof rec.comparisonMetrics];
            });
            return entry;
        });
        return chartFormattedData;
    }, [data]);
    
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="mt-6">
             <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-gray-800" size={28}/>
                <h3 className="text-2xl font-bold text-gray-800">Comparison at a Glance</h3>
            </div>
            <div className="w-full h-96 bg-white/70 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} />
                        <Tooltip contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '0.5rem'
                        }}/>
                        <Legend />
                        {data.map((rec, index) => (
                             <Radar 
                                key={rec.cropName}
                                name={rec.cropName} 
                                dataKey={rec.cropName} 
                                stroke={colors[index % colors.length]} 
                                fill={colors[index % colors.length]} 
                                fillOpacity={0.6} 
                            />
                        ))}
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

interface CropRecommendationProps {
  recommendations: CropRecommendationData[];
  isLoading: boolean;
  error: string | null;
}

const CropRecommendation: React.FC<CropRecommendationProps> = ({ recommendations, isLoading, error }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const hasContent = recommendations.length > 0;

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/30 min-h-[200px] flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-4">
        <BarChart2 className="text-gray-800" size={28}/>
        <h2 className="text-2xl font-bold text-gray-800">Crop Recommendations</h2>
      </div>
      
      <AnimatePresence mode="wait">
        {isLoading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center text-gray-600 py-10"
            >
                <Loader className="h-8 w-8 animate-spin mb-4 text-gray-700"/>
                <p className="font-semibold text-lg">Generating AI Recommendations...</p>
                <p className="text-sm text-gray-500">Analyzing real-time sensor data, please wait.</p>
            </motion.div>
        )}

        {error && !isLoading && (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center text-red-700 bg-red-50 p-4 rounded-lg"
            >
                <AlertTriangle className="h-8 w-8 mb-2"/>
                <p className="font-semibold">Could not get AI Recommendations</p>
                <p className="text-sm">{error}</p>
            </motion.div>
        )}

        {!error && !isLoading && !hasContent && (
             <motion.div 
              key="no-data"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center text-gray-500"
            >
                <p>Generate recommendations based on sensor data.</p>
            </motion.div>
        )}

        {!error && !isLoading && hasContent && (
             <motion.div 
              key="content"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             >
                <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                    <RecommendationItem 
                        key={rec.cropName}
                        rec={rec}
                        isExpanded={expandedIndex === index}
                        onToggle={() => handleToggle(index)}
                    />
                    ))}
                </div>
                <ComparisonChart data={recommendations} />
             </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CropRecommendation;