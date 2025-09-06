import express from 'express';
import { pool } from '../config/database';
import { UserRepository } from '../repositories/UserRepository';
import { GreetingHistoryRepository } from '../repositories/GreetingHistoryRepository';
import { UserFavoriteQuoteRepository } from '../repositories/UserFavoriteQuoteRepository';
import { CreateUserData, UpdateUserPreferences } from '../models/User';

const router = express.Router();
const userRepository = new UserRepository(pool);
const greetingHistoryRepository = new GreetingHistoryRepository(pool);
const favoriteQuoteRepository = new UserFavoriteQuoteRepository(pool);

router.post('/', async (req, res) => {
  try {
    const { name, email, preferred_greeting_style, preferred_time_format, include_quotes } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userData: CreateUserData = {
      name,
      email,
      preferred_greeting_style,
      preferred_time_format,
      include_quotes
    };

    const user = await userRepository.create(userData);
    res.status(201).json(user);
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/:id/preferences', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { id, name, preferred_greeting_style, preferred_time_format, include_quotes, created_at, updated_at } = user;
    res.json({
      id,
      name,
      preferred_greeting_style,
      preferred_time_format,
      include_quotes,
      created_at,
      updated_at
    });
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    res.status(500).json({ error: 'Failed to fetch user preferences' });
  }
});

router.put('/:id/preferences', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const { preferred_greeting_style, preferred_time_format, include_quotes } = req.body;

    const preferences: UpdateUserPreferences = {};
    if (preferred_greeting_style !== undefined) preferences.preferred_greeting_style = preferred_greeting_style;
    if (preferred_time_format !== undefined) preferences.preferred_time_format = preferred_time_format;
    if (include_quotes !== undefined) preferences.include_quotes = include_quotes;

    const user = await userRepository.updatePreferences(userId, preferences);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    res.status(500).json({ error: 'Failed to update user preferences' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const deleted = await userRepository.delete(userId);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.get('/:id/greeting-history', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const history = await greetingHistoryRepository.findByUserId(userId, limit);
    
    res.json(history);
  } catch (error) {
    console.error('Error fetching greeting history:', error);
    res.status(500).json({ error: 'Failed to fetch greeting history' });
  }
});

router.post('/:id/greeting-history', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const { greeting_message, greeting_type, time_of_day } = req.body;
    
    if (!greeting_message || !greeting_type) {
      return res.status(400).json({ error: 'greeting_message and greeting_type are required' });
    }

    const historyEntry = await greetingHistoryRepository.create({
      user_id: userId,
      greeting_message,
      greeting_type,
      time_of_day
    });

    res.status(201).json(historyEntry);
  } catch (error) {
    console.error('Error saving greeting history:', error);
    res.status(500).json({ error: 'Failed to save greeting history' });
  }
});

router.get('/:id/greeting-history/stats', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const stats = await greetingHistoryRepository.getStatsByUserId(userId);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching greeting stats:', error);
    res.status(500).json({ error: 'Failed to fetch greeting stats' });
  }
});

router.get('/:id/favorite-quotes', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const quotes = await favoriteQuoteRepository.findByUserId(userId, limit);
    
    res.json(quotes);
  } catch (error) {
    console.error('Error fetching favorite quotes:', error);
    res.status(500).json({ error: 'Failed to fetch favorite quotes' });
  }
});

router.post('/:id/favorite-quotes', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const { quote_content, quote_author } = req.body;
    
    if (!quote_content) {
      return res.status(400).json({ error: 'quote_content is required' });
    }

    const exists = await favoriteQuoteRepository.exists(userId, quote_content);
    if (exists) {
      return res.status(409).json({ error: 'Quote already in favorites' });
    }

    const favoriteQuote = await favoriteQuoteRepository.create({
      user_id: userId,
      quote_content,
      quote_author
    });

    res.status(201).json(favoriteQuote);
  } catch (error) {
    console.error('Error adding favorite quote:', error);
    res.status(500).json({ error: 'Failed to add favorite quote' });
  }
});

router.delete('/:id/favorite-quotes/:quoteId', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const quoteId = parseInt(req.params.quoteId);
    
    if (isNaN(userId) || isNaN(quoteId)) {
      return res.status(400).json({ error: 'Invalid user ID or quote ID' });
    }

    const deleted = await favoriteQuoteRepository.delete(quoteId, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Quote not found or not owned by user' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error removing favorite quote:', error);
    res.status(500).json({ error: 'Failed to remove favorite quote' });
  }
});

export { router as userRoutes };