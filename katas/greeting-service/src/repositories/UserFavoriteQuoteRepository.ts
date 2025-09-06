import { Pool } from 'pg';
import { UserFavoriteQuote, CreateFavoriteQuoteData } from '../models/UserFavoriteQuote';

export class UserFavoriteQuoteRepository {
  constructor(private pool: Pool) {}

  async create(quoteData: CreateFavoriteQuoteData): Promise<UserFavoriteQuote> {
    const client = await this.pool.connect();
    try {
      const query = `
        INSERT INTO user_favorite_quotes (user_id, quote_content, quote_author)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const values = [
        quoteData.user_id,
        quoteData.quote_content,
        quoteData.quote_author || null
      ];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findByUserId(userId: number, limit: number = 50): Promise<UserFavoriteQuote[]> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM user_favorite_quotes 
        WHERE user_id = $1 
        ORDER BY added_at DESC 
        LIMIT $2
      `;
      const result = await client.query(query, [userId, limit]);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<UserFavoriteQuote | null> {
    const client = await this.pool.connect();
    try {
      const query = 'SELECT * FROM user_favorite_quotes WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = 'DELETE FROM user_favorite_quotes WHERE id = $1 AND user_id = $2';
      const result = await client.query(query, [id, userId]);
      return (result.rowCount ?? 0) > 0;
    } finally {
      client.release();
    }
  }

  async getRandomByUserId(userId: number): Promise<UserFavoriteQuote | null> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM user_favorite_quotes 
        WHERE user_id = $1 
        ORDER BY RANDOM() 
        LIMIT 1
      `;
      const result = await client.query(query, [userId]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async deleteByUserId(userId: number): Promise<number> {
    const client = await this.pool.connect();
    try {
      const query = 'DELETE FROM user_favorite_quotes WHERE user_id = $1';
      const result = await client.query(query, [userId]);
      return result.rowCount ?? 0;
    } finally {
      client.release();
    }
  }

  async exists(userId: number, quoteContent: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = 'SELECT 1 FROM user_favorite_quotes WHERE user_id = $1 AND quote_content = $2 LIMIT 1';
      const result = await client.query(query, [userId, quoteContent]);
      return result.rows.length > 0;
    } finally {
      client.release();
    }
  }
}