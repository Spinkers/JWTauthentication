const passport = require('passport');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config');
const { user } = require('../database');
const errors = require('../errors');

// JSON WEB TOKENS STRATEGYS
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        let userModel;
        try {
          userModel = await user.findOne({
            where: { id: payload.id },
            attributes: ['id', 'username'],
          });
        } catch (err) {
          throw new errors.DatabaseError(err);
        }
        // If user doesn't exists, handle it
        if (!userModel) {
          return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
      return false;
    },
  ),
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
    },
    async (username, password, done) => {
      try {
        // Find the user given the email
        let userModel;
        try {
          userModel = await user.findOne({
            where: { username },
            attributes: ['id', 'username', 'password'],
          });
        } catch (err) {
          throw new errors.DatabaseError(err);
        }
        // If not, handle it
        if (!userModel) {
          return done(null, false);
        }
        // Check if the password is correct
        const userPassword = userModel.get('password');
        const userObj = userModel.get({ plain: true });

        if (await bcrypt.compare(password, userPassword)) {
          done(null, userObj);
        } else {
          return done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
      return false;
    },
  ),
);
