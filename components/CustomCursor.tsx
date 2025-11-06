import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            // Check for interactive elements
            if (target.closest('a, button, input')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        
        const onMouseLeave = () => {
            setPosition({ x: -100, y: -100 });
        }

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    const cursorVariants = {
        default: {
            x: position.x - 8,
            y: position.y - 4,
            scale: 1,
            rotate: -45,
            backgroundColor: 'rgba(255, 255, 255, 0)',
        },
        hover: {
            x: position.x - 16,
            y: position.y - 16,
            scale: 1.5,
            rotate: -60,
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
            variants={cursorVariants}
            animate={isHovering ? 'hover' : 'default'}
            transition={{
                type: 'spring',
                stiffness: 800,
                damping: 40,
                mass: 0.5,
            }}
        >
            <Leaf className="text-green-500 drop-shadow-md" size={20} />
        </motion.div>
    );
};

export default CustomCursor;
