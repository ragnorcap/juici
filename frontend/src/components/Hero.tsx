import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import LiquidBackground from './LiquidBackground';
import Logo from './Logo';

const HeroSection = styled.section`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 50vh;
    padding: 3rem 1rem;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at top right,
    ${theme.colors.purple.light} 0%,
    ${theme.colors.indigo.main} 30%,
    ${theme.colors.indigo.dark} 70%
  );
  z-index: -1;
`;

const HeroContent = styled.div`
  max-width: ${theme.maxWidth};
  width: 80%;
  margin: 0 auto;
  z-index: 1;
`;

const LogoWrapper = styled(motion.div)`
  transform: scale(3);
  margin-bottom: 4rem;
  margin-top: 2rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    transform: scale(2.2);
    margin-bottom: 3rem;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    transform: scale(1.8);
    margin-bottom: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 3.2rem;
  margin-bottom: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  font-weight: ${theme.fonts.weights.light};
  background: linear-gradient(
    90deg, 
    #64ffda 0%,
    #00ff95 30%,
    #90EE90 70%,
    #ADFF2F 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(100, 255, 218, 0.3);
  filter: drop-shadow(0 2px 4px rgba(100, 255, 218, 0.2));
  letter-spacing: -0.5px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.4rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.2rem;
  margin-top: 1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: ${theme.colors.yellow.light};
  font-weight: ${theme.fonts.weights.light};
  font-style: italic;
  opacity: 0.8;
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const HeroDecorator = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  
  &.top-left {
    top: -100px;
    left: -100px;
    background-color: ${theme.colors.purple.main};
  }
  
  &.bottom-right {
    bottom: -100px;
    right: -100px;
    background-color: ${theme.colors.green.main};
  }
  
  &.center-right {
    top: calc(50% - 150px);
    right: 10%;
    background-color: ${theme.colors.yellow.main};
    width: 200px;
    height: 200px;
  }
`;

const Hero: React.FC = () => {
  const logoVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        delay: 0.3, 
        ease: "easeOut" 
      } 
    }
  };
  
  const taglineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.8, 
      transition: { 
        duration: 0.8, 
        delay: 0.6, 
        ease: "easeOut" 
      } 
    }
  };
  
  const decoratorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.4, 
      scale: 1, 
      transition: { 
        duration: 1.5, 
        ease: "easeOut" 
      } 
    }
  };
  
  return (
    <HeroSection>
      <LiquidBackground />
      <HeroBackground />
      <HeroDecorator 
        className="top-left" 
        initial="hidden"
        animate="visible"
        variants={decoratorVariants}
      />
      <HeroDecorator 
        className="bottom-right" 
        initial="hidden"
        animate="visible"
        variants={decoratorVariants}
      />
      <HeroDecorator 
        className="center-right" 
        initial="hidden"
        animate="visible"
        variants={decoratorVariants}
      />
      <HeroContent>
        <LogoWrapper
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <Logo />
        </LogoWrapper>
        
        <HeroSubtitle 
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          Unlock innovative concepts in seconds.
        </HeroSubtitle>
        <Tagline
          initial="hidden"
          animate="visible"
          variants={taglineVariants}
        >
          "Get the juices warmed up creatively. Kobe Bryant didn't just walk into Staples Center at game time, you shouldn't just show up to innovate. Get juiced."
        </Tagline>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 