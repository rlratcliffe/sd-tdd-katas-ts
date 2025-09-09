import { Pool } from 'pg';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

let testPool: Pool;

export async function setupTestDatabase() {
  console.log('Setting up database tables...');
  
  const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  testPool = new Pool({ connectionString });

  const initDbPath = join(__dirname, '../../init-db');
  const createTablesSQL = readFileSync(join(initDbPath, '01-create-tables.sql'), 'utf8');
  
  await testPool.query(createTablesSQL);
  console.log('Created tables');
  
  const createFunctionsPath = join(initDbPath, '02-create-functions.sql');
  if (existsSync(createFunctionsPath)) {
    const createFunctionsSQL = readFileSync(createFunctionsPath, 'utf8');
    await testPool.query(createFunctionsSQL);
    console.log('Created functions');
  } else {
    console.log('Functions file not found, skipping');
  }
}

export async function teardownTestDatabase() {
  if (testPool) {
    await testPool.end();
  }
}

export function getTestPool() {
  if (!testPool) {
    throw new Error('Test database not initialized. Call setupTestDatabase() first.');
  }
  return testPool;
}

export async function clearDatabase() {
  const pool = getTestPool();
  await pool.query('TRUNCATE TABLE greeting_history, user_favorite_quotes, users RESTART IDENTITY CASCADE');
}