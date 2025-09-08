import request from 'supertest';
import app from "../../src";

describe('Greetings with favorite quotes', () => {
    test('user gets personalized greeting without favorite quote when include_quotes is false ', async () => {
        // user with id 2 exists in database
        const response = await request(app)
            .get('/api/greeting/3/with-favorite-quote')
            .expect(200);

        expect(response.status).toBe(200);
        expect(response.body).toBe({message: 'Hello, hope you\'re doing great!'});
        // expect history to have been saved (check before and after?)

    });
});