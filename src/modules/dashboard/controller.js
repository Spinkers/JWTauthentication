const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../auth/config');

module.exports = {
    test: async (req, res) => {
        console.log('It works!');
        res.json({ message: 'It works!' });
      },
};


