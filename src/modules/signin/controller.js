const JWT = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  signIn: (req, res) => {
    const { user } = req;

    // Generate token
    const token = JWT.sign(
      {
        user,
      },
      config.get('authenticate'), { expiresIn: '1h' } // Expires in 1h
    );

    res.json({ token: `bearer ${token}`, username: user.username });
  },
};
