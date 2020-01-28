const service = require('./service');

module.exports = {
    signUp: async (req, res) => {
        const { username, password } = req.body;
        const register = await service.findAll(username, password);
        register ? res.status(201).json({ message: 'Sucess!' }) : 
        res.status(409).json({ message: 'User already exists' });
    },
};


