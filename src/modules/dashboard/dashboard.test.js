const superTeste = require('supertest');
const express = require('express');
const router = require('./router');
const db = require('../database');
const auth = require('../auth');

const app = express();
app.use(auth.initialize);
auth.configStrategies();
app.use('/dashboard', router);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  res.json(err);
});
jest.mock('../database');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /dashboard', () => {
    it('should responds with json and statusCode 200', async () => {
      const token =
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0sImlhdCI6MTU4MDc0MzM3OX0.kWqyYtYosb4wMaiaGjn_4TurMqcyZkGZz3lZQM__ClM';

        const response = {
            message: 'It works!'
        }

        db.user.findOne.mockReturnValue({
            get: jest.fn().mockReturnValue(response),
        });

      const res = await superTeste(app)
        .get('/dashboard')
        .set('Authorization', token);

        expect(res.statusCode).toStrictEqual(200);
        expect(res.body).toStrictEqual(response);
    });
  });