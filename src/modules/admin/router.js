const express = require('express');
const passport = require('passport');
const controller = require('./controller');
const { validationMiddleware } = require('../validation');
const schemas = require('./validations');

const router = express.Router();
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });
// eslint-disable-next-line no-unused-vars
const passportConf = require('./passport');

router.post(
  '/signin',
  validationMiddleware(schemas.login, 'body'),
  passportSignIn,
  controller.signIn,
);
router.get('/test', passportJWT, controller.test);
module.exports = router;
