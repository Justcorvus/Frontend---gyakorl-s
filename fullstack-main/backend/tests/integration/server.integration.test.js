const request = require('supertest');
const app = require('../../server');
require('dotenv').config();

describe('Integrációs Tesztek (Élő Adatbázis)', () => {
    let testUserId;

    // A JEST kilépésének kulcsa: lezárjuk a pool-t a tesztek után
    afterAll(async () => {
        if (app.pool) {
            await app.pool.end();
        }
    });

    test('POST /api/users - Új rekord mentése', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ name: 'Teszt Elek', email: `test_${Date.now()}@example.com` });

        expect(res.statusCode).toBe(201);
        testUserId = res.body.id;
    });

    test('GET /api/users - Ellenőrzés', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.some(u => u.id === testUserId)).toBe(true);
    });

    test('DELETE /api/users/:id - Takarítás', async () => {
        const res = await request(app).delete(`/api/users/${testUserId}`);
        expect(res.statusCode).toBe(200);
    });
});