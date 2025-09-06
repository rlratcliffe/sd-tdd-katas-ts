export interface Quote {
  content: string;
}

interface FakerApiResponse {
  data: Array<{
    content?: string;
    text?: string;
  }>;
}

export class QuoteService {
  private readonly fallbackQuotes = [
    'Make today amazing!',
    'Have a wonderful day!',
    'Wishing you success today!',
    'Today is full of possibilities!',
    "You've got this!",
    'Believe in yourself today!'
  ];

  private readonly apiUrl = 'https://fakerapi.it/api/v2/texts?_quantity=1&_characters=150';

  async getQuote(): Promise<Quote> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as FakerApiResponse;
      
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        const quoteText = data.data[0].content || data.data[0].text || 'No quote available';
        return { content: this.cleanQuoteText(quoteText) };
      }

      throw new Error('Invalid API response structure');
    } catch (error) {
      console.warn('Quote API failed, using fallback:', error);
      return this.getFallbackQuote();
    }
  }

  getFallbackQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * this.fallbackQuotes.length);
    return { content: this.fallbackQuotes[randomIndex] };
  }

  private cleanQuoteText(text: string): string {
    return text
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/^["']|["']$/g, '');
  }
}