export type GreetingStyle = 'casual' | 'formal' | 'funny';
export type TimeFormat = '12hour' | '24hour';

export interface User {
  id?: number;
  name: string;
  email?: string;
  preferred_greeting_style: GreetingStyle;
  preferred_time_format: TimeFormat;
  include_quotes: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserData {
  name: string;
  email?: string;
  preferred_greeting_style?: GreetingStyle;
  preferred_time_format?: TimeFormat;
  include_quotes?: boolean;
}

export interface UpdateUserPreferences {
  preferred_greeting_style?: GreetingStyle;
  preferred_time_format?: TimeFormat;
  include_quotes?: boolean;
}