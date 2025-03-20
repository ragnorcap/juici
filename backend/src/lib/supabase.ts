import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SECRET || '';

// Create Supabase client with service role key for admin operations
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// User management functions
export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId: string, userData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', userId);
  
  return { data, error };
};

// Favorites management functions
export const getFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);
  
  return { data, error };
};

export const addFavorite = async (userId: string, prompt: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, prompt }]);
  
  return { data, error };
};

export const removeFavorite = async (id: number) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', id);
  
  return { error };
}; 