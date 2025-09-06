import { QuoteService, Quote } from './QuoteService';
import { GreetingStyle } from '../models/User';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export class GreetingService {
  private quoteService = new QuoteService();
  
  private readonly basicMessages = [
    'Hello {User}!',
    'Hey {User}, nice to see you here!',
    '{User} welcome back!',
    'Have a splendid day {User}.'
  ];

  private readonly morningMessages = [
    'Good morning, {User}! The sun is high and shining!',
    'Hey {User}, nice to see you here!',
    '{User} welcome back!',
    'Have a splendid day {User}.'
  ];

  private readonly afternoonMessages = [
    'Hello {User}!',
    'You are great {User}'
  ];


  private readonly nightMessages = [
    'Have a good night, {User}',
    'Wish you sweet dreams {User} ...',
    'It was a great day! {User} it\'s time to relax!'
  ];

  private readonly morningQuoteMessages = [
    'Good morning, {User}! The sun is high and shining! Here\'s something to inspire your day: "{quote}"',
    'Hey {User}, nice to see you here! Today\'s inspiration: "{quote}"',
    '{User} welcome back! Let this motivate you: "{quote}"',
    'Have a splendid day {User}. Remember: "{quote}"'
  ];

  private readonly afternoonQuoteMessages = [
    'Hello {User}! Here\'s something to brighten your afternoon: "{quote}"',
    'You are great {User}! Here\'s a reminder: "{quote}"'
  ];

  private readonly nightQuoteMessages = [
    'Have a good night, {User}. Here\'s a thought for tomorrow: "{quote}"',
    'Wish you sweet dreams {User}. Sleep well with this wisdom: "{quote}"',
    'It was a great day! {User}, end it with this inspiration: "{quote}"'
  ];

  private readonly casualMessages = {
    morning: [
      'Hey {User}!',
      'What\'s up {User}!',
      '{User}, hope you\'re doing great!'
    ],
    afternoon: [
      'Hey {User}!',
      'What\'s up {User}!',
      '{User}, hope you\'re doing great!'
    ],
    evening: [
      'Hey {User}!',
      'What\'s up {User}!',
      '{User}, hope you\'re doing great!'
    ],
    night: [
      'Hey {User}!',
      'What\'s up {User}!',
      '{User}, hope you\'re doing great!'
    ]
  };

  private readonly formalMessages = {
    morning: [
      'Good morning, {User}.',
      'I trust you are having a pleasant morning, {User}.',
      '{User}, I hope this message finds you well.'
    ],
    afternoon: [
      'Good afternoon, {User}.',
      'I trust you are having a pleasant afternoon, {User}.',
      '{User}, I hope this message finds you well.'
    ],
    evening: [
      'Good evening, {User}.',
      'I trust you are having a pleasant evening, {User}.',
      '{User}, I hope this message finds you well.'
    ],
    night: [
      'Good evening, {User}.',
      'I trust you are having a pleasant evening, {User}.',
      '{User}, I hope this message finds you well.'
    ]
  };

  private readonly funnyMessages = {
    morning: [
      '{User}! Ready to conquer the world today?',
      'Alert! {User} has entered the chat!',
      '{User}, may your coffee be strong and your Monday be short!'
    ],
    afternoon: [
      '{User}! Ready to conquer the world today?',
      'Alert! {User} has entered the chat!',
      '{User}, hope you\'re crushing it today!'
    ],
    evening: [
      '{User}! Ready to conquer the world today?',
      'Alert! {User} has entered the chat!',
      '{User}, hope you\'re winding down awesomely!'
    ],
    night: [
      '{User}! Ready to conquer the world today?',
      'Alert! {User} has entered the chat!',
      '{User}, time to recharge those awesome powers!'
    ]
  };

  getGreeting(name?: string, useTimeBasedGreeting: boolean = false): string {
    if (!name) {
      return 'Hello my friend!';
    }

    if (!useTimeBasedGreeting) {
      const template = this.getRandomMessage(this.basicMessages);
      return template.replace('{User}', name);
    }

    const timeOfDay = this.getTimeOfDay();
    const messages = this.getMessagesForTime(timeOfDay);
    const template = this.getRandomMessage(messages);
    return template.replace('{User}', name);
  }

  async getGreetingWithQuote(name?: string): Promise<string> {
    if (!name) {
      return 'Hello my friend!';
    }

    const quote = await this.quoteService.getQuote();
    return `Hello ${name}! Here's something to inspire your day: '${quote.content}'`;
  }

  async getTimeBasedGreetingWithQuote(name?: string): Promise<string> {
    if (!name) {
      return 'Hello my friend!';
    }

    const quote = await this.quoteService.getQuote();
    const timeOfDay = this.getTimeOfDay();
    const messages = this.getQuoteMessagesForTime(timeOfDay);
    const template = this.getRandomMessage(messages);
    
    return template
      .replace('{User}', name)
      .replace('{quote}', quote.content);
  }

  getPersonalizedGreeting(name: string, greetingStyle: GreetingStyle, useTimeBasedGreeting: boolean = true): string {
    if (!name) {
      return 'Hello my friend!';
    }

    const timeOfDay = useTimeBasedGreeting ? this.getTimeOfDay() : 'morning';
    const messages = this.getMessagesForStyle(greetingStyle, timeOfDay);
    const template = this.getRandomMessage(messages);
    
    return template.replace('{User}', name);
  }

  async getPersonalizedGreetingWithQuote(
    name: string, 
    greetingStyle: GreetingStyle,
    favoriteQuote?: Quote
  ): Promise<string> {
    if (!name) {
      return 'Hello my friend!';
    }

    const quote = favoriteQuote || await this.quoteService.getQuote();
    const timeOfDay = this.getTimeOfDay();
    
    let template: string;
    if (greetingStyle === 'casual') {
      template = `${this.getRandomMessage(this.casualMessages[timeOfDay])} Here's something to inspire your day: "${quote.content}"`;
    } else if (greetingStyle === 'formal') {
      template = `${this.getRandomMessage(this.formalMessages[timeOfDay])} I hope this wisdom serves you well: "${quote.content}"`;
    } else {
      template = `${this.getRandomMessage(this.funnyMessages[timeOfDay])} And here's some epic wisdom: "${quote.content}"`;
    }
    
    return template.replace('{User}', name);
  }

  private getTimeOfDay(): TimeOfDay {
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

  private getMessagesForTime(timeOfDay: TimeOfDay): string[] {
    switch (timeOfDay) {
      case 'morning':
        return this.morningMessages;
      case 'afternoon':
      case 'evening':
        return this.afternoonMessages;
      case 'night':
        return this.nightMessages;
      default:
        return this.basicMessages;
    }
  }

  private getQuoteMessagesForTime(timeOfDay: TimeOfDay): string[] {
    switch (timeOfDay) {
      case 'morning':
        return this.morningQuoteMessages;
      case 'afternoon':
      case 'evening':
        return this.afternoonQuoteMessages;
      case 'night':
        return this.nightQuoteMessages;
      default:
        return this.morningQuoteMessages;
    }
  }

  private getMessagesForStyle(greetingStyle: GreetingStyle, timeOfDay: TimeOfDay): string[] {
    switch (greetingStyle) {
      case 'casual':
        return this.casualMessages[timeOfDay];
      case 'formal':
        return this.formalMessages[timeOfDay];
      case 'funny':
        return this.funnyMessages[timeOfDay];
      default:
        return this.casualMessages[timeOfDay];
    }
  }

  private getRandomMessage(messages: string[]): string {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
}