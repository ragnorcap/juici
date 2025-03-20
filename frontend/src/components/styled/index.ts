import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

// Layout components
export const Container = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

export const Section = styled.section`
  padding: 5rem 0;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

// Hero Section components
export const HeroSection = styled(Section)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #000000 0%, #2d1b4d 50%, #1a0d2c 100%);
  color: white;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  margin-bottom: 1.5rem;
  background: linear-gradient(
    90deg, 
    ${theme.colors.purple.main}, 
    ${theme.colors.green.main}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  background: linear-gradient(
    90deg, 
    #90EE90, /* Limegreen */
    #FFFF00  /* Yellow */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Animated liquid background for hero
export const LiquidBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.08;
`;

// Button styles
export const Button = styled(motion.button)<{ primary?: boolean }>`
  padding: 0.8rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: ${theme.borderRadius};
  background: ${props => props.primary 
    ? `linear-gradient(90deg, #90EE90, #FFFF00)` 
    : theme.colors.green.main};
  color: #1a0d2c;
  box-shadow: ${theme.boxShadow};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

// Prompt card styles
export const PromptCard = styled(motion.div)`
  background: #2d1b4d;
  border-radius: ${theme.borderRadius};
  padding: 2.5rem;
  box-shadow: ${theme.boxShadow};
  margin: 2rem auto;
  max-width: 800px;
  position: relative;
  border-left: 5px solid #FFFF00;
  color: white;
`;

export const PromptText = styled.h2`
  font-size: 1.8rem;
  line-height: 1.4;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const CopyButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(144, 238, 144, 0.2);
  color: #90EE90;
  border: none;
  border-radius: ${theme.borderRadius};
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(144, 238, 144, 0.4);
    color: white;
  }
`;

// Loading styles
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const JuiceDroplet = styled(motion.div)`
  width: 20px;
  height: 20px;
  background: #90EE90;
  border-radius: 50%;
  margin: 0 8px;
`;

// Error message
export const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  padding: 1rem;
  background: rgba(231, 76, 60, 0.2);
  border-radius: ${theme.borderRadius};
  margin: 2rem 0;
`; 