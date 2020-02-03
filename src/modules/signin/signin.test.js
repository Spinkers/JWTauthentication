const superTeste = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const db = require('../database');
const auth = require('../auth');

const app = express();
app.use(auth.initialize);
auth.configStrategies();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/signin', router);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  res.json(err);
});
jest.mock('../database');

beforeEach(() => {
  jest.clearAllMocks();
});

  describe('POST /signin', () => {
    it('should return an json with token and username', async () => {
        const mockUser = {
          id: 1,
          username: 'Lucas',
          password: '$2b$12$nT/8GO9Ei1dPo0ylr6FD6e/rj.aQTheVl3/1AH3AZwyjz4hmvmDZC',
        };

        db.user.findOne.mockReturnValue({
            get: jest.fn().mockReturnValue(mockUser),
        });

        const res = await superTeste(app).post('/signin').send({
          username: 'Lucas',
          password: '12345678',
        });

        const mockBodyResponse = {
          token: res.body.token,
          username: res.body.username,
        }
        
        expect(res.statusCode).toStrictEqual(200);
        expect(res.body).toStrictEqual(mockBodyResponse);
    });
  });