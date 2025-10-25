
import React, { useState } from 'react';
import type { CropRecommendationData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, Zap, TrendingUp, ChevronDown, Repeat } from 'lucide-react';

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const CropRecommendation: React.FC<{ recommendations: CropRecommendationData[] }> = ({ recommendations }) => {
  const [view, setView] = useState<'best' | 'compare'>('best');
  const [expanded, setExpanded] = useState<number | null>(null);
  const bestMatch = recommendations[0];
  const alternatives = recommendations.slice(1);

  const radarData = recommendations.map(rec => ({
    subject: rec.cropName,
    A: rec.comparisonMetrics['Water Need'],
    B: rec.comparisonMetrics['Market Value'],
    C: rec.comparisonMetrics['Pest Resistance'],
    fullMark: 10,
  }));

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-white/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Crop Recommendations</h2>
        <div className="flex items-center gap-2 p-1 rounded-full bg-gray-200">
          <button onClick={() => setView('best')} className={`px-3 py-1 text-sm rounded-full ${view === 'best' ? 'bg-white shadow' : ''}`}>Best Match</button>
          <button onClick={() => setView('compare')} className={`px-3 py-1 text-sm rounded-full ${view === 'compare' ? 'bg-white shadow' : ''}`}>Compare All</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'best' ? (
          <motion.div key="best" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-white/70 p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center text-center">
                <img src={`https://picsum.photos/seed/${bestMatch.cropName}/200`} alt={bestMatch.cropName} className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg" />
                <h3 className="text-3xl font-bold text-green-600">{bestMatch.cropName}</h3>
                <p className="text-gray-500">Suitability Score</p>
                <p className="text-5xl font-bold font-mono text-gray-800">{bestMatch.suitabilityScore}</p>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-gray-600">{bestMatch.rationale}</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-100/50 p-3 rounded-lg"><p className="font-bold text-blue-600">{bestMatch.comparisonMetrics['Water Need']}/10</p><p className="text-sm text-blue-500">Water Need</p></div>
                  <div className="bg-amber-100/50 p-3 rounded-lg"><p className="font-bold text-amber-600">{bestMatch.comparisonMetrics['Market Value']}/10</p><p className="text-sm text-amber-500">Market Value</p></div>
                  <div className="bg-red-100/50 p-3 rounded-lg"><p className="font-bold text-red-600">{bestMatch.comparisonMetrics['Pest Resistance']}/10</p><p className="text-sm text-red-500">Pest Resistance</p></div>
                </div>
              </div>
            </div>
            
            <h4 className="mt-6 mb-2 font-semibold text-gray-700">Alternatives</h4>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {alternatives.map(alt => (
                <div key={alt.cropName} className="flex-shrink-0 w-48 bg-white/70 p-4 rounded-lg text-center">
                  <img src={`https://picsum.photos/seed/${alt.cropName}/100`} alt={alt.cropName} className="w-20 h-20 rounded-full object-cover mx-auto mb-2" />
                  <p className="font-bold">{alt.cropName}</p>
                  <p className="text-sm text-gray-500">Score: <span className="font-mono">{alt.suitabilityScore}</span></p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Tooltip />
                  <Radar name="Water Need" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Radar name="Market Value" dataKey="B" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  <Radar name="Pest Resistance" dataKey="C" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CropRecommendation;
