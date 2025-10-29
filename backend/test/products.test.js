const request = require('supertest');
const app = require('../index');

describe('Products API', () => {
  it('GET /products returns 200 and array', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /products creates a product', async () => {
    const res = await request(app).post('/products').send({ name: 'Gorra', price: 8});
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Gorra');
  });
});
