import { setupTestDatabase, teardownTestDatabase } from './testDatabase';

beforeAll(async () => {
  await setupTestDatabase();
}, 120000);

afterAll(async () => {
  await teardownTestDatabase();
}, 30000);