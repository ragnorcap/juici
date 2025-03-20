import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

interface PRDModalProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 14, 52, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 2rem;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.indigo.main};
  border-radius: 16px;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 85vh;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.08);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${theme.colors.green.main},
      ${theme.colors.purple.main},
      ${theme.colors.yellow.main}
    );
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 1rem;
  position: sticky;
  top: 0;
  background: ${theme.colors.indigo.main};
  z-index: 10;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
  background: linear-gradient(
    90deg, 
    ${theme.colors.green.light}, 
    ${theme.colors.purple.light}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${theme.fonts.weights.light};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: ${theme.colors.yellow.main};
  }
`;

const PRDContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-wrap;
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fonts.weights.light};
  
  h1, h2, h3, h4, h5, h6 {
    background: linear-gradient(
      90deg, 
      ${theme.colors.purple.light},
      ${theme.colors.yellow.light}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 1.5rem;
    font-weight: ${theme.fonts.weights.light};
  }
  
  h1 {
    font-size: 2.2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-top: 1.8rem;
    margin-bottom: 0.8rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.6rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  code {
    background: rgba(0, 0, 0, 0.2);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  blockquote {
    border-left: 3px solid ${theme.colors.green.main};
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
    color: ${theme.colors.textLight};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  position: sticky;
  bottom: 0;
  background: ${theme.colors.indigo.main};
  padding-top: 1rem;
  border-top: 2px solid rgba(255, 255, 255, 0.08);
`;

const ActionButton = styled(motion.button)`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const CopyButton = styled(ActionButton)`
  background: ${theme.colors.indigo.light};
  color: white;
  
  &:hover {
    background: ${theme.colors.purple.main};
  }
`;

const DownloadButton = styled(ActionButton)`
  background: linear-gradient(
    90deg,
    ${theme.colors.green.main},
    ${theme.colors.green.light}
  );
  color: white;
  box-shadow: 0 4px 15px rgba(80, 200, 120, 0.3);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(80, 200, 120, 0.5);
    transform: translateY(-2px);
  }
`;

// Function to convert markdown to HTML
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';
  
  return markdown
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
    .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/<\/li>\n<li>/g, '</li><li>')
    .replace(/<li>(.*)<\/li>/gm, '<ul><li>$1</li></ul>')
    .replace(/<\/ul>\n<ul>/g, '')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
};

const PRDModal: React.FC<PRDModalProps> = ({ content, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `PRD-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          onClick={e => e.stopPropagation()}
        >
          <ModalHeader>
            <ModalTitle>Product Requirements Document</ModalTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>
          
          <PRDContent dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
          
          <ActionButtons>
            <CopyButton 
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy PRD"}
            </CopyButton>
            <DownloadButton 
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
            >
              Download as Markdown
            </DownloadButton>
          </ActionButtons>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default PRDModal; 