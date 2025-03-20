import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fonts.weights.light};
    background-color: ${theme.colors.indigo.dark};
    color: ${theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fonts.weights.extraLight};
    color: ${theme.colors.text};
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 4.5rem;
    letter-spacing: -0.5px;
    
    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
  
  h2 {
    font-size: 3rem;
    letter-spacing: -0.5px;
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  button {
    font-family: ${theme.fonts.body};
    cursor: pointer;
    border: none;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
  }
  
  a {
    text-decoration: none;
    color: ${theme.colors.purple.main};
    transition: ${theme.transition};
    
    &:hover {
      color: ${theme.colors.purple.dark};
    }
  }
  
  /* For smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* For custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.indigo.dark};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, ${theme.colors.green.main}, ${theme.colors.yellow.main});
    border-radius: 4px;
  }

  ::selection {
    background: ${theme.colors.purple.main};
    color: white;
  }
`; 