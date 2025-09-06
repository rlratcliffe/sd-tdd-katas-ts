export type GreetingType = 'basic' | 'time_based' | 'quote_enhanced';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface GreetingHistory {
  id?: number;
  user_id: number;
  greeting_message: string;
  greeting_type: GreetingType;
  time_of_day?: TimeOfDay;
  created_at?: Date;
}

export interface CreateGreetingHistoryData {
  user_id: number;
  greeting_message: string;
  greeting_type: GreetingType;
  time_of_day?: TimeOfDay;
}