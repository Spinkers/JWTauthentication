const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../auth/config');

module.exports = {
  signIn: (req, res) => {
    const { user } = req;

    // Generate token
    const token = JWT.sign(
      {
        user,
      },
      JWT_SECRET, { expiresIn: '1h' } // Expires in 1h
    );

    res.json({ token: `bearer ${token}`, username: user.username });
  },
};
