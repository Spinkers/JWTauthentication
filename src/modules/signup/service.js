const { user } = require('../database');
const bcrypt = require('bcrypt');

module.exports = {
  findAll: async (username, password) => {
        // Verify if already exists
        let userModel;
        try {
          userModel = await user.findOne({
            where: { username },
          });
        } catch (err) {
          throw new error(err);
        }
        // If exists, return false
        if (userModel) {
            return false;
        }
        // If not exists, creates and return true
        bcrypt.hash(password, 12, function(err, hash) {
            user.create({
                username,
                password: hash,
                isActive: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            })
        });
        return true;
  },
};