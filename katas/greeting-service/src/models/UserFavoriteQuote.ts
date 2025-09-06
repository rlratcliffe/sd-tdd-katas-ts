export interface UserFavoriteQuote {
  id?: number;
  user_id: number;
  quote_content: string;
  quote_author?: string;
  added_at?: Date;
}

export interface CreateFavoriteQuoteData {
  user_id: number;
  quote_content: string;
  quote_author?: string;
}