import { getTestPool } from './testDatabase';

export interface TestUser {
  id?: number;
  name: string;
  email: string;
  preferred_greeting_style?: 'casual' | 'formal' | 'funny';
  preferred_time_format?: '12hour' | '24hour';
  include_quotes?: boolean;
}

export async function createTestUser(userData: TestUser): Promise<number> {
  const pool = getTestPool();
  
  const result = await pool.query(`
    INSERT INTO users (name, email, preferred_greeting_style, preferred_time_format, include_quotes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `, [
    userData.name,
    userData.email,
    userData.preferred_greeting_style || 'casual',
    userData.preferred_time_format || '12hour',
    userData.include_quotes !== undefined ? userData.include_quotes : true
  ]);
  
  return result.rows[0].id;
}

export async function clearAllTables() {
  const pool = getTestPool();
  await pool.query('TRUNCATE TABLE greeting_history, user_favorite_quotes, users RESTART IDENTITY CASCADE');
}

export async function addFavoriteQuote(userId: number, quote: string, author?: string) {
  const pool = getTestPool();
  await pool.query(`
    INSERT INTO user_favorite_quotes (user_id, quote_content, quote_author)
    VALUES ($1, $2, $3)
  `, [userId, quote, author]);
}

export async function getGreetingHistory(userId: number) {
  const pool = getTestPool();
  const result = await pool.query(
    'SELECT * FROM greeting_history WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function getLatestGreeting(userId: number) {
  const pool = getTestPool();
  const result = await pool.query(
    'SELECT * FROM greeting_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return result.rows[0] || null;
}

export async function getAllGreetingHistory() {
  const pool = getTestPool();
  const result = await pool.query(
    'SELECT * FROM greeting_history ORDER BY created_at DESC'
  );
  return result.rows;
}