import { Pool } from 'pg';
import { User, CreateUserData, UpdateUserPreferences } from '../models/User';

export class UserRepository {
  constructor(private pool: Pool) {}

  async create(userData: CreateUserData): Promise<User> {
    const client = await this.pool.connect();
    try {
      const query = `
        INSERT INTO users (name, email, preferred_greeting_style, preferred_time_format, include_quotes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const values = [
        userData.name,
        userData.email || null,
        userData.preferred_greeting_style || 'casual',
        userData.preferred_time_format || '12hour',
        userData.include_quotes !== undefined ? userData.include_quotes : true
      ];
      
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async updatePreferences(userId: number, preferences: UpdateUserPreferences): Promise<User | null> {
    const client = await this.pool.connect();
    try {
      const updates = [];
      const values = [];
      let paramIndex = 1;

      if (preferences.preferred_greeting_style !== undefined) {
        updates.push(`preferred_greeting_style = $${paramIndex++}`);
        values.push(preferences.preferred_greeting_style);
      }
      if (preferences.preferred_time_format !== undefined) {
        updates.push(`preferred_time_format = $${paramIndex++}`);
        values.push(preferences.preferred_time_format);
      }
      if (preferences.include_quotes !== undefined) {
        updates.push(`include_quotes = $${paramIndex++}`);
        values.push(preferences.include_quotes);
      }

      if (updates.length === 0) {
        return this.findById(userId);
      }

      const query = `
        UPDATE users 
        SET ${updates.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
      `;
      values.push(userId);

      const result = await client.query(query, values);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } finally {
      client.release();
    }
  }

  async findAll(limit: number = 50, offset: number = 0): Promise<User[]> {
    const client = await this.pool.connect();
    try {
      const query = 'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2';
      const result = await client.query(query, [limit, offset]);
      return result.rows;
    } finally {
      client.release();
    }
  }
}