-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  preferred_greeting_style VARCHAR(10) DEFAULT 'casual' CHECK (preferred_greeting_style IN ('casual', 'formal', 'funny')),
  preferred_time_format VARCHAR(10) DEFAULT '12hour' CHECK (preferred_time_format IN ('12hour', '24hour')),
  include_quotes BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create greeting_history table
CREATE TABLE IF NOT EXISTS greeting_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  greeting_message TEXT NOT NULL,
  greeting_type VARCHAR(20) NOT NULL CHECK (greeting_type IN ('basic', 'time_based', 'quote_enhanced')),
  time_of_day VARCHAR(10) CHECK (time_of_day IN ('morning', 'afternoon', 'evening', 'night')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_favorite_quotes table
CREATE TABLE IF NOT EXISTS user_favorite_quotes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  quote_content TEXT NOT NULL,
  quote_author VARCHAR(255),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);