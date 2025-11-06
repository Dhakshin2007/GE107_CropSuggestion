import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import type { ChatMessage } from '../types';

interface AIChatAgentProps {
    isOpen: boolean;
    onClose: () => void;
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const AIChatAgent: React.FC<AIChatAgentProps> = ({ isOpen, onClose, messages, onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        if (isOpen) {
          setTimeout(() => scrollToBottom(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center md:items-center"
                >
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-50 text-gray-800 rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] md:h-[70vh] flex flex-col"
                        aria-modal="true"
                        role="dialog"
                        aria-labelledby="ai-chat-title"
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between p-4 border-b border-slate-200 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <Bot size={24} className="text-green-600" />
                                <h2 id="ai-chat-title" className="text-xl font-bold">Agri-AI Assistant</h2>
                            </div>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 transition-colors" aria-label="Close chat">
                                <X size={24} />
                            </button>
                        </header>

                        {/* Messages */}
                        <div className="flex-grow p-4 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex gap-3 items-start ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                        {msg.role === 'model' && (
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                                <Bot size={20} className="text-white" />
                                            </div>
                                        )}
                                        <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-slate-200 text-gray-800 rounded-bl-none'}`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                         {msg.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                                <User size={20} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3 items-start">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                            <Bot size={20} className="text-white" />
                                        </div>
                                        <div className="max-w-md p-3 rounded-2xl bg-slate-200 text-gray-800 rounded-bl-none">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <footer className="p-4 border-t border-slate-200 flex-shrink-0">
                            <form onSubmit={handleSend} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about your farm..."
                                    className="w-full px-4 py-2 bg-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    disabled={isLoading}
                                    aria-label="Chat message input"
                                />
                                <button type="submit" disabled={isLoading || !input.trim()} className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send message">
                                    <Send size={20} />
                                </button>
                            </form>
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIChatAgent;
