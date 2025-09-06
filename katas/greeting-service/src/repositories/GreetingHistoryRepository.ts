import { Pool } from 'pg';
import { GreetingHistory, CreateGreetingHistoryData } from '../models/GreetingHistory';

export class GreetingHistoryRepository {
  constructor(private pool: Pool) {}

  async create(historyData: CreateGreetingHistoryData): Promise<GreetingHistory> {
    const client = await this.pool.connect();
    try {
      const query = `
        INSERT INTO greeting_history (user_id, greeting_message, greeting_type, time_of_day)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [
        historyData.user_id,
        historyData.greeting_message,
        historyData.greeting_type,
        historyData.time_of_day || null
      ];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findByUserId(userId: number, limit: number = 10): Promise<GreetingHistory[]> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM greeting_history 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT $2
      `;
      const result = await client.query(query, [userId, limit]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getStatsByUserId(userId: number): Promise<{
    total_greetings: number;
    basic_greetings: number;
    time_based_greetings: number;
    quote_enhanced_greetings: number;
    most_active_time: string | null;
  }> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT 
          COUNT(*) as total_greetings,
          SUM(CASE WHEN greeting_type = 'basic' THEN 1 ELSE 0 END) as basic_greetings,
          SUM(CASE WHEN greeting_type = 'time_based' THEN 1 ELSE 0 END) as time_based_greetings,
          SUM(CASE WHEN greeting_type = 'quote_enhanced' THEN 1 ELSE 0 END) as quote_enhanced_greetings,
          MODE() WITHIN GROUP (ORDER BY time_of_day) as most_active_time
        FROM greeting_history 
        WHERE user_id = $1
      `;
      const result = await client.query(query, [userId]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async deleteByUserId(userId: number): Promise<number> {
    const client = await this.pool.connect();
    try {
      const query = 'DELETE FROM greeting_history WHERE user_id = $1';
      const result = await client.query(query, [userId]);
      return result.rowCount ?? 0;
    } finally {
      client.release();
    }
  }
}