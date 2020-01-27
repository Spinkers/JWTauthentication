const express = require('express');
const controller = require('./controller');
const auth = require('../auth');
const { secureJwt } = auth;

const router = express.Router();

router.get('/', secureJwt, controller.test);
module.exports = router;
