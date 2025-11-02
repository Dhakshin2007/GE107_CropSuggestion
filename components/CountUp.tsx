import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({ value, duration = 1, decimals = 0 }) => {
    const count = useMotionValue(0);
    const transformed = useTransform(count, latest => latest.toFixed(decimals));

    useEffect(() => {
        const controls = animate(count, value, {
            duration,
            ease: "easeOut",
        });
        return controls.stop;
    }, [value, duration, count]);

    return <motion.span>{transformed}</motion.span>;
};

export default CountUp;
