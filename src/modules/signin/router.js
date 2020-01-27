const express = require('express');
const controller = require('./controller');
const auth = require('../auth');

const router = express.Router();

const { secureLocal } = auth;

router.post('/', secureLocal, controller.signIn);
module.exports = router;
