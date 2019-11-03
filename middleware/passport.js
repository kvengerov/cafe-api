const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload, done) => {
          try {
            const user = await User.findById(payload.userId).select('email id');
            if (user) {
              done(null, user)
            } else {
              done(null, false)
            }
          } catch (e) {
            console.log(e);
          }
        })
      )
};
