const express = require('express');
const swaggerUI = require('swagger-ui-express');
const spec = require('./specification');

const router = express.Router();

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(spec));

module.exports = router;
