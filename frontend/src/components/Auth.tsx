import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { signIn, signUp } from '../lib/supabase';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthOverlay = styled(motion.div)`
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
`;

const AuthContainer = styled(motion.div)`
  background: ${theme.colors.indigo.main};
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 450px;
  width: 100%;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
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
      ${theme.colors.yellow.main},
      ${theme.colors.purple.main}
    );
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: ${theme.colors.yellow.main};
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: ${theme.fonts.weights.light};
  background: linear-gradient(
    90deg, 
    ${theme.colors.yellow.light}, 
    ${theme.colors.purple.light}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${theme.colors.textLight};
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  font-family: ${theme.fonts.body};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.purple.main};
    box-shadow: 0 0 0 2px rgba(123, 104, 238, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(
    90deg,
    ${theme.colors.yellow.main},
    ${theme.colors.purple.main}
  );
  color: white;
  font-size: 1.1rem;
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  font-family: ${theme.fonts.body};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(123, 104, 238, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const AuthModeToggle = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  
  button {
    background: none;
    border: none;
    color: ${theme.colors.yellow.main};
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0 0.25rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${theme.colors.yellow.light};
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #51cf66;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(81, 207, 102, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Auth: React.FC<AuthProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (isLogin) {
        // Handle login
        const { data, error } = await signIn(email, password);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data?.user) {
          setSuccess('Login successful! Redirecting...');
          // Close modal after successful login
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      } else {
        // Handle signup
        const { data, error } = await signUp(email, password, name);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (data) {
          setSuccess('Registration successful! Please check your email for confirmation.');
          // Switch to login after successful signup
          setTimeout(() => {
            setIsLogin(true);
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <AuthOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AuthContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        onClick={e => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <FormTitle>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </FormTitle>
        
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required={!isLogin}
              />
            </FormGroup>
          )}
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </SubmitButton>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </Form>
        
        <AuthModeToggle>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </AuthModeToggle>
      </AuthContainer>
    </AuthOverlay>
  );
};

export default Auth; 