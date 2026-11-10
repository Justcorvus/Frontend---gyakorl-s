// Adatbázis hívások mockolása - izolált környezet
const mockQuery = jest.fn();
const mockEnd = jest.fn().mockResolvedValue(undefined);
jest.mock('mysql2/promise', () => ({
    createPool: jest.fn(() => ({
        query: mockQuery,
        end: mockEnd,
    })),
}));

const request = require('supertest');
const app = require('../../server'); // Két szinttel feljebb van a server.js

describe('Unit Tesztek (Mockolt)', () => {

    beforeEach(() => {
        mockQuery.mockClear();
    });

    afterAll(async () => {
        if (app.pool && app.pool.end) {
            await app.pool.end();
        }
    });

    test('GET / - Szerver válaszol', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello, a backend szerver fut!');
    });

    test('GET /ping - Mockolt adatbázis válasz', async () => {
        mockQuery.mockResolvedValueOnce([[{ solution: 2 }], {}]);

        const res = await request(app).get('/ping');
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(2);
    });

    test('POST /api/users - Hibaág: hiányzó név validáció', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ email: 'nincs_nev@test.com' });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('A név és az email mező kitöltése kötelező.');
    });
});