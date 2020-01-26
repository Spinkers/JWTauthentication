const express = require('express');
const passport = require('passport');
const controller = require('./controller');

const router = express.Router();
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignin = passport.authenticate('local', { session: false });
const passportConf = require('./passport');

router.post('/signin', passportSignin, controller.signIn);
router.post('/signup', controller.signUp);
router.get('/test', passportJWT, controller.test);
module.exports = router;
