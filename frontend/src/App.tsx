import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Hero from './components/Hero';
import IdeaGenerator from './components/IdeaGenerator';
import Auth from './components/Auth';
import Logo from './components/Logo';
import styled from 'styled-components';
import { onAuthStateChange, getCurrentUser, signOut, UserSession } from './lib/supabase';
import { supabase } from './lib/supabase';

// Main app wrapper
const AppWrapper = styled.div`
  background: ${theme.colors.indigo.dark};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

// Navbar component - made more transparent and thinner
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  position: absolute; /* Changed from fixed to absolute */
  top: 0;
  left: 0;
  right: 0;
  background: rgba(38, 20, 72, 0.5); /* More transparent */
  backdrop-filter: blur(5px);
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  height: 40px; /* Explicitly set height to be smaller */
`;

const NavLogoWrapper = styled.div`
  transform: scale(0.35);
  transform-origin: left center;
  margin-left: -30px;
  margin-top: 5px;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const AuthButton = styled.button`
  background: linear-gradient(
    90deg,
    ${theme.colors.purple.main} 0%,
    ${theme.colors.indigo.light} 100%
  );
  color: white;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(123, 104, 238, 0.4);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserEmail = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.textLight};
`;

// Integrated layout without sections
const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* Removed margin-top since navbar is now absolute */
`;

const App: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [userSession, setUserSession] = useState<UserSession>({ user: null, session: null });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { user, session } = await getCurrentUser();
        setUserSession({ user, session });
      } catch (error) {
        console.error('Error getting current user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserSession({
        session,
        user: session?.user || null
      });
    });
    
    // Clean up subscription on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <Navbar>
          <NavLogoWrapper>
            <Logo />
          </NavLogoWrapper>
          <NavButtons>
            {userSession.user ? (
              <UserInfo>
                <UserEmail>{userSession.user.email}</UserEmail>
                <AuthButton onClick={handleSignOut}>
                  Sign Out
                </AuthButton>
              </UserInfo>
            ) : (
              <AuthButton onClick={() => setShowAuth(true)}>
                Sign In
              </AuthButton>
            )}
          </NavButtons>
        </Navbar>
        
        <MainContent>
          <Hero />
          <IdeaGenerator user={userSession.user} />
        </MainContent>
        
        <Auth 
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
        />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App; 