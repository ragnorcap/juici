import React from 'react';
import { motion } from 'framer-motion';
import { LoadingContainer, JuiceDroplet } from './styled';

// Juice droplet animation variant
const dropletVariants = {
  initial: {
    y: 0,
  },
  animate: (i: number) => ({
    y: [0, -20, 0],
    backgroundColor: [
      '#FFFF00', // Yellow
      '#90EE90', // Limegreen
      '#5D3FD3', // Purple
      '#FFFF00', // Yellow
    ],
    transition: {
      y: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
        delay: i * 0.1,
      },
      backgroundColor: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      }
    }
  })
};

const JuiceLoader: React.FC = () => {
  return (
    <LoadingContainer>
      {[0, 1, 2].map((i) => (
        <JuiceDroplet
          key={i}
          custom={i}
          variants={dropletVariants}
          initial="initial"
          animate="animate"
        />
      ))}
    </LoadingContainer>
  );
};

export default JuiceLoader; 