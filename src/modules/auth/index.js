const passport = require('passport');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config');
const { user } = require('../database');

const initialize = passport.initialize();
const configStrategies = () => {
  // JSON WEB TOKENS STRATEGIES
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
        secretOrKey: JWT_SECRET,
      },
      async (payload, done) => {
        // Find the user specified in token
        let userModel;
        try {
          userModel = await user.findOne({
            where: { id: payload.id },
          });
        } catch (err) {
          return done(null, err);
        }
        // If user doesn't exists, handle it
        if (!userModel) {
          return done(null, false);
        }
        // Otherwise, return the user
        return done(null, user);
      },
    ),
  );

  // LOCAL STRATEGY
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      // Find the user given the email
      let userModel;
      try {
        userModel = await user.findOne({
          where: { username, isActive: true },
          attributes: ['id', 'username', 'password'],
        });
      } catch (err) {
        return done(null, err);
      }
      // If not, handle it
      if (!userModel) {
        return done(null, false);
      }
      
      // Check if the password is correct
      const userPassword = userModel.get('password');
      const userObj = userModel.get({ plain: true });

      if (!(await bcrypt.compare(password, userPassword))) {
        return done(null, false);
      }
      delete userObj.password;
      return done(null, userObj);
    }),
  );
};

const secureLocal = passport.authenticate('local', { session: false });
const secureJwt = passport.authenticate('jwt', { session: false });

module.exports = {
  initialize,
  configStrategies,
  secureLocal,
  secureJwt,
};
