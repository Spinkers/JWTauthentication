const service = require('./service');

module.exports = {
    signUp: async (req, res) => {
        const { username, password } = req.body;
        const register = await service.insertOne(username, password);
        register ? res.status(201).json({ message: 'Success!' }) : 
        res.status(409).json({ message: 'User already exists' });
    },
};


