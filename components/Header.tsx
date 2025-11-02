import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Download, Loader } from 'lucide-react';

interface HeaderProps {
    deviceName: string;
    locationName: string;
    onExportPDF: () => void;
    isExporting: boolean;
}

const Header: React.FC<HeaderProps> = ({ deviceName, locationName, onExportPDF, isExporting }) => {
    return (
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between text-white/90"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-3">
                <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full ring-2 ring-green-300/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="font-semibold text-lg">Live Data from <span className="font-mono bg-black/20 px-2 py-1 rounded">{deviceName}</span></span>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                 <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="font-semibold">{locationName}</span>
                </div>
                <button 
                    onClick={onExportPDF}
                    disabled={isExporting}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isExporting ? (
                        <>
                            <Loader size={16} className="animate-spin" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <Download size={16} />
                            <span>Export Summary</span>
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default Header;