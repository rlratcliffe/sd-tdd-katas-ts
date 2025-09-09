import { PostgreSqlContainer } from '@testcontainers/postgresql';

export default async function globalSetup() {
  console.log('Starting global test setup...');
  
  const container = await new PostgreSqlContainer('postgres:15-alpine')
    .withDatabase('greeting_service')
    .withUsername('postgres')
    .withPassword('postgres')
    .start();

  process.env.DB_HOST = container.getHost();
  process.env.DB_PORT = container.getPort().toString();
  process.env.DB_NAME = container.getDatabase();
  process.env.DB_USER = container.getUsername();
  process.env.DB_PASSWORD = container.getPassword();

  console.log('Test container started:', {
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase()
  });

  // Store container info for teardown
  (global as any).__TESTCONTAINER__ = container;
}