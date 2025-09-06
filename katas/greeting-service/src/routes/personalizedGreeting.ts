import express from 'express';
import { pool } from '../config/database';
import { UserRepository } from '../repositories/UserRepository';
import { GreetingHistoryRepository } from '../repositories/GreetingHistoryRepository';
import { UserFavoriteQuoteRepository } from '../repositories/UserFavoriteQuoteRepository';
import { GreetingService } from '../services/GreetingService';
import { GreetingType } from '../models/GreetingHistory';

const router = express.Router();
const userRepository = new UserRepository(pool);
const greetingHistoryRepository = new GreetingHistoryRepository(pool);
const favoriteQuoteRepository = new UserFavoriteQuoteRepository(pool);
const greetingService = new GreetingService();

router.get('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const message = greetingService.getPersonalizedGreeting(
      user.name,
      user.preferred_greeting_style,
      true
    );

    await greetingHistoryRepository.create({
      user_id: userId,
      greeting_message: message,
      greeting_type: 'time_based' as GreetingType,
      time_of_day: getCurrentTimeOfDay()
    });

    res.json({ message });
  } catch (error) {
    console.error('Error generating personalized greeting:', error);
    res.status(500).json({ error: 'Failed to generate greeting' });
  }
});

router.get('/:userId/with-favorite-quote', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.include_quotes) {
      const message = greetingService.getPersonalizedGreeting(
        user.name,
        user.preferred_greeting_style,
        true
      );
      
      await greetingHistoryRepository.create({
        user_id: userId,
        greeting_message: message,
        greeting_type: 'time_based' as GreetingType,
        time_of_day: getCurrentTimeOfDay()
      });

      return res.json({ message });
    }

    const favoriteQuote = await favoriteQuoteRepository.getRandomByUserId(userId);
    
    const message = await greetingService.getPersonalizedGreetingWithQuote(
      user.name,
      user.preferred_greeting_style,
      favoriteQuote ? { content: favoriteQuote.quote_content } : undefined
    );

    await greetingHistoryRepository.create({
      user_id: userId,
      greeting_message: message,
      greeting_type: 'quote_enhanced' as GreetingType,
      time_of_day: getCurrentTimeOfDay()
    });

    res.json({ 
      message, 
      used_favorite_quote: !!favoriteQuote,
      quote_author: favoriteQuote?.quote_author
    });
  } catch (error) {
    console.error('Error generating personalized greeting with quote:', error);
    res.status(500).json({ error: 'Failed to generate greeting with quote' });
  }
});

function getCurrentTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  
  if (hour >= 7 && hour <= 11) {
    return 'morning';
  } else if (hour >= 12 && hour <= 17) {
    return 'afternoon';
  } else if (hour >= 18 && hour <= 20) {
    return 'evening';
  } else {
    return 'night';
  }
}

export { router as personalizedGreetingRoutes };