import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Database, Cloud, Zap, Bot, BarChart, FileText, Code } from 'lucide-react';

interface AboutModalProps {
    show: boolean;
    onClose: () => void;
}

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mt-1">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600">{children}</p>
        </div>
    </div>
);

const AboutModal: React.FC<AboutModalProps> = ({ show, onClose }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">About AgriSuggest AI</h2>
                            <p className="text-gray-500 mt-2 max-w-lg mx-auto">
                                A smart farming dashboard to empower farmers with actionable, real-time insights using IoT and AI.
                            </p>
                        </div>

                        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-3">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Key Features</h3>
                                <div className="space-y-4">
                                    <FeatureItem icon={<Zap size={16} />} title="Real-Time Dashboard">
                                        Live monitoring of air temperature, humidity, soil moisture, and light from IoT sensors.
                                    </FeatureItem>
                                     <FeatureItem icon={<Cpu size={16} />} title="AI Crop Recommendations">
                                        Powered by Google's Gemini API to analyze data and suggest 10 suitable crops with detailed rationale.
                                    </FeatureItem>
                                    <FeatureItem icon={<Cloud size={16} />} title="Hyperlocal Weather">
                                        Current conditions and a 7-day forecast from the Open-Meteo API for precise planning.
                                    </FeatureItem>
                                    <FeatureItem icon={<BarChart size={16} />} title="Proactive Alerts & Trends">
                                        Intelligent alerts for critical conditions and dynamic charts for historical sensor trends.
                                    </FeatureItem>
                                    <FeatureItem icon={<Bot size={16} />} title="Conversational AI Assistant">
                                        Interactive chat agent to ask questions about farm data in natural language.
                                    </FeatureItem>
                                    <FeatureItem icon={<FileText size={16} />} title="PDF & Email Reports">
                                        One-click functionality to export a comprehensive dashboard summary.
                                    </FeatureItem>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Technology Stack</h3>
                                <div className="flex flex-wrap gap-3">
                                    <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">React & TypeScript</span>
                                    <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Google Gemini API</span>
                                    <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Supabase</span>
                                    <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Tailwind CSS</span>
                                    <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Framer Motion</span>
                                    <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Recharts</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AboutModal;
