const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

module.exports = {
  signIn: async (req, res) => {
    const { username, id } = req.user;

    // Generate token
    const token = JWT.sign(
      {
        id,
        username,
      },
      JWT_SECRET,
    );

    res.status(201).json({ token, username });
  },

  test: async (req, res) => {
    console.log('It works!');
    res.json({ message: 'It works!' });
  },
};
