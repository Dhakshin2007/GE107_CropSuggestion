import React, { useState } from 'react';
import { Mail, Coffee, Users, Info } from 'lucide-react';
import BuyMeACoffeeModal from './BuyMeACoffeeModal';
import ContributorsModal from './ContributorsModal';
import AboutModal from './AboutModal';

const Footer: React.FC = () => {
    const [isBmcModalOpen, setIsBmcModalOpen] = useState(false);
    const [isContributorsModalOpen, setIsContributorsModalOpen] = useState(false);
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

    return (
        <>
            <footer className="text-center py-6 border-t border-white/20 text-white/80">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
                    <a
                        href="mailto:2024aib1009@iitrpr.ac.in"
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Mail size={16} />
                        <span>Contact Support</span>
                    </a>
                     <button
                        onClick={() => setIsContributorsModalOpen(true)}
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Users size={16} />
                        <span>Meet the Team</span>
                    </button>
                    <button
                        onClick={() => setIsAboutModalOpen(true)}
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Info size={16} />
                        <span>About This Project</span>
                    </button>
                    <button
                        onClick={() => setIsBmcModalOpen(true)}
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Coffee size={16} />
                        <span>Buy Me a Coffee</span>
                    </button>
                </div>
                <p className="text-xs mt-4 opacity-60">&copy; {new Date().getFullYear()} AgriSuggest AI. All rights reserved.</p>
            </footer>
            <BuyMeACoffeeModal
                show={isBmcModalOpen}
                onClose={() => setIsBmcModalOpen(false)}
            />
            <ContributorsModal
                show={isContributorsModalOpen}
                onClose={() => setIsContributorsModalOpen(false)}
            />
            <AboutModal
                show={isAboutModalOpen}
                onClose={() => setIsAboutModalOpen(false)}
            />
        </>
    );
};

export default Footer;