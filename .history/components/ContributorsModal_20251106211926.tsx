
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Github, Globe } from 'lucide-react';
import type { Contributor } from '../types';

interface ContributorsModalProps {
    show: boolean;
    onClose: () => void;
}

const contributors: Contributor[] = [
    {
        name: 'Dhakshin Kotha',
        role: 'SPOC',
        imageUrl: './public/Me.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/dhakshinkotha/',
        githubUrl: 'https://github.com/Dhakshin2007',
    },
    {
        name: 'Aditya Verma',
        role: 'Web & Presentation Making',
        imageUrl: './public/Verma.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/aditya-verma-a699ba337/',
        githubUrl: 'https://github.com/Aditya-Verma251',
    },
    {
        name: 'Harsh Yadav',
        role: 'Data & Backend Specialist',
        imageUrl: '/public/Harsh.jpg',
        linkedinUrl: '#',
        githubUrl: 'https://github.com/hoaorosoh',
    },
];

const ContributorCard: React.FC<{ contributor: Contributor }> = ({ contributor }) => {
    return (
        <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <img src={contributor.imageUrl} alt={contributor.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-grow">
                <h3 className="font-bold text-gray-800">{contributor.name}</h3>
                <p className="text-sm text-gray-500">{contributor.role}</p>
                <div className="flex items-center gap-3 mt-2">
                    {contributor.linkedinUrl && contributor.linkedinUrl !== '#' && (
                        <a href={contributor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors" aria-label={`${contributor.name}'s LinkedIn`}>
                            <Linkedin size={20} />
                        </a>
                    )}
                    {contributor.githubUrl && contributor.githubUrl !== '#' && (
                        <a href={contributor.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label={`${contributor.name}'s GitHub`}>
                            <Github size={20} />
                        </a>
                    )}
                    {contributor.portfolioUrl && contributor.portfolioUrl !== '#' && (
                        <a href={contributor.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors" aria-label={`${contributor.name}'s Portfolio`}>
                            <Globe size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};


const ContributorsModal: React.FC<ContributorsModalProps> = ({ show, onClose }) => {
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
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Meet the Team</h2>
                            <p className="text-gray-500 mb-6">The passionate developers behind AgriSuggest AI.</p>
                        </div>
                        
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {contributors.map(contributor => (
                                <ContributorCard key={contributor.name} contributor={contributor} />
                            ))}
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContributorsModal;
