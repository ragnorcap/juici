import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import { supabase, getFavorites, addFavorite, removeFavorite } from './lib/supabase';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());

// Read prompts from JSON file
const promptsFilePath = path.join(__dirname, '../../data/prompts.json');
const promptsData = JSON.parse(fs.readFileSync(promptsFilePath, 'utf-8'));
const prompts: string[] = promptsData.prompts;

// API Route to get a random prompt
app.get('/api/random-prompt', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];
    
    res.json({ 
      prompt: randomPrompt,
      index: randomIndex,
      total: prompts.length
    });
  } catch (error) {
    console.error('Error fetching random prompt:', error);
    res.status(500).json({ 
      error: 'Failed to generate random prompt',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Route to generate a PRD from OpenAI
app.post('/api/generate-prd', async (req, res) => {
  try {
    const { idea } = req.body;
    
    if (!idea) {
      return res.status(400).json({ error: 'No idea provided' });
    }
    
    // We'll use environment variables for the API key
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Create prompt for OpenAI
    const prompt = `Create a full professional grade PRD for "${idea}", including language requirements, app flow, front end/ backend, and tech stack in one document`;
    
    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional product manager creating detailed product requirement documents.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    
    const prdContent = response.data.choices[0].message.content;
    
    res.json({ 
      idea,
      prd: prdContent
    });
  } catch (error) {
    console.error('Error generating PRD:', error);
    res.status(500).json({ 
      error: 'Failed to generate PRD',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Route to get user favorites
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const { data, error } = await getFavorites(userId);
    
    if (error) {
      throw error;
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ 
      error: 'Failed to fetch favorites',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Route to add a favorite
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    
    if (!userId || !prompt) {
      return res.status(400).json({ error: 'User ID and prompt are required' });
    }
    
    const { data, error } = await addFavorite(userId, prompt);
    
    if (error) {
      throw error;
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ 
      error: 'Failed to add favorite',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Route to remove a favorite
app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Favorite ID is required' });
    }
    
    const { error } = await removeFavorite(parseInt(id));
    
    if (error) {
      throw error;
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ 
      error: 'Failed to remove favorite',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Creative Juice API is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🧃 Creative Juice API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Random prompt: http://localhost:${PORT}/api/random-prompt`);
}); 