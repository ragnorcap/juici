import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import PRDModal from './PRDModal';
import { theme } from '../styles/theme';
import { saveFavoritePrompt, getFavoritePrompts, deleteFavoritePrompt } from '../lib/supabase';
import { MdStar, MdFavorite, MdDelete } from 'react-icons/md';

// Create an axios instance specifically for browser usage
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface IdeaGeneratorProps {
  user: {
    id: string;
    email?: string;
  } | null;
}

interface Favorite {
  id: number;
  user_id: string;
  prompt: string;
  created_at: string;
}

const IdeaGeneratorContainer = styled.section`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  background: linear-gradient(
    180deg,
    ${theme.colors.indigo.dark} 0%,
    ${theme.colors.indigo.main} 100%
  );
`;

const IdeaCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
  
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

const IdeaText = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  color: white;
  text-align: center;
  font-weight: ${theme.fonts.weights.light};
`;

const GenerateButton = styled(motion.button)`
  background: linear-gradient(
    90deg,
    ${theme.colors.purple.main} 0%,
    ${theme.colors.indigo.light} 100%
  );
  color: white;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.4);
  transition: all 0.3s ease;
  margin: 0.5rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(123, 104, 238, 0.6);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const PRDButton = styled(GenerateButton)`
  background: linear-gradient(
    90deg,
    ${theme.colors.green.main} 0%,
    ${theme.colors.green.light} 100%
  );
  box-shadow: 0 4px 15px rgba(80, 200, 120, 0.4);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(80, 200, 120, 0.6);
  }
`;

const FavoriteButton = styled(GenerateButton)`
  background: linear-gradient(
    90deg,
    ${theme.colors.yellow.main} 0%,
    ${theme.colors.yellow.light} 100%
  );
  box-shadow: 0 4px 15px rgba(255, 204, 0, 0.4);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(255, 204, 0, 0.6);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: ${theme.colors.purple.main};
  margin: 2rem auto;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'transparent'};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid ${props => props.active 
    ? theme.colors.yellow.main 
    : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  vertical-align: middle;
`;

const IdeasWaterfall = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 50vh;
  overflow-y: auto;
  padding: 1rem;
  
  /* Hide scrollbar but allow scrolling */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PastIdeaCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    font-weight: ${theme.fonts.weights.light};
    color: white;
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Message = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.colors.textLight};
  font-style: italic;
`;

const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ user }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [pastIdeas, setPastIdeas] = useState<string[]>([]);
  const [prdLoading, setPrdLoading] = useState<boolean>(false);
  const [prdContent, setPrdContent] = useState<string>('');
  const [showPrdModal, setShowPrdModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'ideas' | 'favorites'>('ideas');
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState<boolean>(false);
  
  // Load favorites if user is logged in
  useEffect(() => {
    if (user?.id) {
      loadFavorites();
    }
  }, [user]);
  
  const loadFavorites = async () => {
    if (!user?.id) return;
    
    try {
      setFavoritesLoading(true);
      const { data, error } = await getFavoritePrompts(user.id);
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setFavoritesLoading(false);
    }
  };
  
  const fetchRandomPrompt = async () => {
    try {
      setLoading(true);
      setPrdContent('');
      
      const response = await axiosInstance.get('/api/random-prompt');
      setPrompt(response.data.prompt);
      
      // Add to past ideas if not empty
      if (prompt) {
        setPastIdeas(prev => [prompt, ...prev].slice(0, 10));
      }
    } catch (error) {
      console.error('Failed to fetch random prompt:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const generatePRD = async () => {
    if (!prompt) return;
    
    try {
      setPrdLoading(true);
      
      const response = await axiosInstance.post('/api/generate-prd', {
        idea: prompt
      });
      
      setPrdContent(response.data.prd);
      setShowPrdModal(true);
    } catch (error) {
      console.error('Failed to generate PRD:', error);
      alert('Failed to generate PRD. Please try again.');
    } finally {
      setPrdLoading(false);
    }
  };
  
  const handleSaveFavorite = async () => {
    if (!user?.id || !prompt) return;
    
    try {
      const { error } = await saveFavoritePrompt(user.id, prompt);
      
      if (error) {
        throw error;
      }
      
      // Reload favorites to see the new one
      await loadFavorites();
      
      // Switch to favorites tab
      setActiveTab('favorites');
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Failed to save favorite. Please try again.');
    }
  };
  
  const handleDeleteFavorite = async (id: number) => {
    try {
      const { error } = await deleteFavoritePrompt(id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setFavorites(prev => prev.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error deleting favorite:', error);
      alert('Failed to delete favorite. Please try again.');
    }
  };
  
  useEffect(() => {
    fetchRandomPrompt();
  }, []);
  
  return (
    <IdeaGeneratorContainer>
      {user?.id && (
        <Tabs>
          <Tab 
            active={activeTab === 'ideas'} 
            onClick={() => setActiveTab('ideas')}
          >
            <IconWrapper><MdStar /></IconWrapper>
            Ideas
          </Tab>
          <Tab 
            active={activeTab === 'favorites'} 
            onClick={() => setActiveTab('favorites')}
          >
            <IconWrapper><MdFavorite /></IconWrapper>
            Favorites
          </Tab>
        </Tabs>
      )}
      
      {activeTab === 'ideas' ? (
        <>
          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingSpinner 
                key="spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <IdeaCard
                key="idea"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <IdeaText>
                  {prompt || "Click 'Generate' to get an idea"}
                </IdeaText>
                <ButtonContainer>
                  <GenerateButton
                    whileTap={{ scale: 0.95 }}
                    onClick={fetchRandomPrompt}
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Generate New Idea'}
                  </GenerateButton>
                  
                  {prompt && (
                    <>
                      <PRDButton
                        whileTap={{ scale: 0.95 }}
                        onClick={generatePRD}
                        disabled={prdLoading || !prompt}
                      >
                        {prdLoading ? 'Creating PRD...' : 'Generate PRD'}
                      </PRDButton>
                      
                      {user?.id && (
                        <FavoriteButton
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveFavorite}
                          disabled={!prompt}
                        >
                          <IconWrapper><MdFavorite /></IconWrapper>
                          Save Favorite
                        </FavoriteButton>
                      )}
                    </>
                  )}
                </ButtonContainer>
              </IdeaCard>
            )}
          </AnimatePresence>
          
          {pastIdeas.length > 0 && (
            <IdeasWaterfall>
              {pastIdeas.map((idea, index) => (
                <PastIdeaCard
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4>Previous Idea #{pastIdeas.length - index}</h4>
                  {idea}
                  
                  {user?.id && (
                    <ActionButtons>
                      <ActionButton onClick={() => {
                        setPrompt(idea);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}>
                        <MdStar />
                      </ActionButton>
                    </ActionButtons>
                  )}
                </PastIdeaCard>
              ))}
            </IdeasWaterfall>
          )}
        </>
      ) : (
        // Favorites tab
        <AnimatePresence mode="wait">
          {favoritesLoading ? (
            <LoadingSpinner 
              key="spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : favorites.length > 0 ? (
            <IdeasWaterfall>
              {favorites.map((favorite, index) => (
                <PastIdeaCard
                  key={favorite.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4>Favorite Idea</h4>
                  {favorite.prompt}
                  
                  <ActionButtons>
                    <ActionButton onClick={() => {
                      setPrompt(favorite.prompt);
                      setActiveTab('ideas');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                      <MdStar />
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteFavorite(favorite.id)}>
                      <MdDelete />
                    </ActionButton>
                  </ActionButtons>
                </PastIdeaCard>
              ))}
            </IdeasWaterfall>
          ) : (
            <Message>
              You haven't saved any favorites yet. Generate some ideas and save the ones you like!
            </Message>
          )}
        </AnimatePresence>
      )}
      
      <PRDModal
        isOpen={showPrdModal}
        onClose={() => setShowPrdModal(false)}
        content={prdContent}
      />
    </IdeaGeneratorContainer>
  );
};

export default IdeaGenerator; 