const superTeste = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const db = require('../database');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/signup', router);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  res.json(err);
});
jest.mock('../database');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /signup', () => {
    it('should responds with json and statusCode 201', async () => {
        const response = {
            message: 'Success!'
        };

        const user = {
            username: 'USUARIO',
            password: '12345678',
        };

        db.user.create.mockReturnValue({
            get: jest.fn().mockReturnValue(response),
        });

      const res = await superTeste(app)
        .post('/signup')
        .send(user);

      expect(res.statusCode).toStrictEqual(201);
      expect(res.body).toStrictEqual(response);
    });

    it('should responds with json and statusCode 409', async () => {
      const response = {
          message: 'User already exists'
      };

      const user = {
          username: 'USUARIO',
          password: '12345678',
      };

      db.user.findOne.mockReturnValue({
          get: jest.fn().mockReturnValue(response),
      });

    const res = await superTeste(app)
      .post('/signup')
      .send(user);

    expect(res.statusCode).toStrictEqual(409);
    expect(res.body).toStrictEqual(response);
  });
});