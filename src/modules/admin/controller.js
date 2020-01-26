const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const service = require('./service');

module.exports = {
  signIn: async (req, res) => {
    const { username, id } = req.user;

    // Generate token
    const token = JWT.sign(
      {
        id,
        username,
      },
      JWT_SECRET, { expiresIn: '1h' } // Expires in 1h
    );

    res.status(201).json({ token, username });
  },

  signUp: async (req, res) => {
    const { username, password } = req.body;
    const register = await service.findAll(username, password);
    register ? res.status(201).json({ message: 'Sucess!' }) : 
    res.status(201).json({ message: 'User already exists' });
  },

  test: async (req, res) => {
    console.log('It works!');
    res.json({ message: 'It works!' });
  },
};
