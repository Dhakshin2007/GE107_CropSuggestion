import React, { useState } from 'react';
import { Mail, Coffee } from 'lucide-react';
import BuyMeACoffeeModal from './BuyMeACoffeeModal';

const Footer: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <footer className="text-center py-6 border-t border-white/20 text-white/80">
                <div className="flex items-center justify-center gap-6">
                    <a
                        href="mailto:2024aib1009@iitrpr.ac.in"
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Mail size={16} />
                        <span>Contact Support</span>
                    </a>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Coffee size={16} />
                        <span>Buy Me a Coffee</span>
                    </button>
                </div>
                <p className="text-xs mt-4 opacity-60">&copy; {new Date().getFullYear()} AgriSuggest AI. All rights reserved.</p>
            </footer>
            <BuyMeACoffeeModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Footer;
