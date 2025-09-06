import { Pool } from 'pg';

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'greeting_service',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(dbConfig);

export async function initDatabase(): Promise<void> {
  const client = await pool.connect();
  try {
    await createTables(client);
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function createTables(client: any): Promise<void> {
  const createUsersTable = `
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
  `;

  const createGreetingHistoryTable = `
    CREATE TABLE IF NOT EXISTS greeting_history (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      greeting_message TEXT NOT NULL,
      greeting_type VARCHAR(20) NOT NULL CHECK (greeting_type IN ('basic', 'time_based', 'quote_enhanced')),
      time_of_day VARCHAR(10) CHECK (time_of_day IN ('morning', 'afternoon', 'evening', 'night')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const createUserFavoriteQuotesTable = `
    CREATE TABLE IF NOT EXISTS user_favorite_quotes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      quote_content TEXT NOT NULL,
      quote_author VARCHAR(255),
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const createUpdatedAtFunction = `
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `;

  const createUpdatedAtTrigger = `
    DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  `;

  await client.query(createUsersTable);
  await client.query(createGreetingHistoryTable);
  await client.query(createUserFavoriteQuotesTable);
  await client.query(createUpdatedAtFunction);
  await client.query(createUpdatedAtTrigger);
}