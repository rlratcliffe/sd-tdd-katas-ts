import express from 'express';
import { GreetingService } from '../services/GreetingService';

const router = express.Router();
const greetingService = new GreetingService();

router.get('/greeting', async (req, res) => {
  try {
    const { name, timeBasedGreeting, withQuote } = req.query;
    const userName = typeof name === 'string' ? name : undefined;
    const useTimeBasedGreeting = timeBasedGreeting === 'true';
    const includeQuote = withQuote === 'true';
    
    let message: string;
    
    if (includeQuote && useTimeBasedGreeting) {
      message = await greetingService.getTimeBasedGreetingWithQuote(userName);
    } else if (includeQuote) {
      message = await greetingService.getGreetingWithQuote(userName);
    } else {
      message = greetingService.getGreeting(userName, useTimeBasedGreeting);
    }
    
    res.json({ message });
  } catch (error) {
    console.error('Error generating greeting:', error);
    res.status(500).json({ error: 'Failed to generate greeting' });
  }
});

export { router as greetingRoutes };