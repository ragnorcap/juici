import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const JuiceIcon = styled(motion.div)`
  width: 80px;
  height: 100px;
  position: relative;
  margin-right: 20px;
`;

const JuiceGlass = styled(motion.div)`
  width: 65px;
  height: 90px;
  border-radius: 10px 10px 25px 25px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid ${theme.colors.purple.main};
  position: absolute;
  bottom: 0;
  left: 7px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
`;

const JuiceContent = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75%;
  background: linear-gradient(
    135deg,
    ${theme.colors.yellow.main} 0%,
    ${theme.colors.green.main} 50%,
    ${theme.colors.green.light} 100%
  );
  border-radius: 0 0 22px 22px;
`;

const Straw = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 110px;
  background: ${theme.colors.green.light};
  top: -20px;
  right: 15px;
  border-radius: 8px;
  transform: rotate(-10deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const LogoText = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(
    90deg,
    ${theme.colors.green.light} 0%,
    ${theme.colors.yellow.main} 50%,
    ${theme.colors.green.main} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const bubbleVariants = {
  animate: {
    y: [0, -40],
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut"
    }
  }
};

const contentVariants = {
  animate: {
    y: [2, -2, 2],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <JuiceIcon>
        <JuiceGlass>
          <JuiceContent
            variants={contentVariants}
            animate="animate"
          />
          {[1, 2, 3, 4].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: '50%',
                bottom: 10 + Math.random() * 40,
                left: 5 + Math.random() * 45
              }}
              variants={bubbleVariants}
              animate="animate"
              custom={i * 0.5}
            />
          ))}
        </JuiceGlass>
        <Straw />
      </JuiceIcon>
      <LogoText>Juici</LogoText>
    </LogoContainer>
  );
};

export default Logo; 