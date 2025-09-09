import request from 'supertest';
import app from "../../src";
import { createTestUser, clearAllTables, getLatestGreeting } from '../setup/testUtils';

describe('Greetings with favorite quotes', () => {
    beforeEach(async () => {
        await clearAllTables();
    });

    test('user gets personalized greeting without favorite quote when include_quotes is false ', async () => {
        const userId = await createTestUser({
            name: 'Test User',
            email: 'test@example.com',
            include_quotes: false
        });

        const response = await request(app)
            .get(`/api/greeting/${userId}/with-favorite-quote`)
            .expect(200);

        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.body).toBeOneOf([
            {message: 'Test User, hope you\'re doing great!'},
            {message: 'What\'s up Test User!'},
            {message: 'Hey Test User!'}
        ]);

        const latestGreeting = await getLatestGreeting(userId);
        expect(latestGreeting).toMatchObject({
            user_id: userId,
            greeting_type: 'time_based'
        });
    });
});