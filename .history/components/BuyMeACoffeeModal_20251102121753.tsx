import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BuyMeACoffeeModalProps {
    show: boolean;
    onClose: () => void;
}

const BuyMeACoffeeModal: React.FC<BuyMeACoffeeModalProps> = ({ show, onClose }) => {
    
    // IMPORTANT: Replace this placeholder with the actual URL of your QR code image.
    const qrCodeImageUrl = 'https://i.postimg.cc/W1KTNfy3/Whats-App-Image-2025-11-02-at-17-42-57-96509e4d.jpg';
    const upiId = 'dhakshinkotha2007@okaxis';

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
                        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Buy Me a Coffee</h2>
                        <p className="text-gray-500 mb-6">If you find this tool helpful, please consider supporting its development.</p>

                        <img 
                            src={qrCodeImageUrl} 
                            alt="UPI QR Code" 
                            className="w-48 h-48 mx-auto rounded-lg border-4 border-gray-100"
                        />
                        
                        <p className="text-gray-600 mt-4">Or use UPI ID:</p>
                        <p className="font-mono text-lg font-semibold bg-gray-100 text-gray-800 px-4 py-2 rounded-lg mt-2 inline-block">
                            {upiId}
                        </p>

                        <button
                            onClick={onClose}
                            className="mt-8 w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BuyMeACoffeeModal;
