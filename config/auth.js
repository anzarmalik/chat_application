
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/login')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports.serializeUser = function () {
  'use strict'
  passport.serializeUser(function (user, done) {
    // console.log(user)
    done(null, user.userId)
  })
}


module.exports.deserializeUser = function () {
  'use strict'
  passport.deserializeUser(function (id, done) {
    // console.log(id)

    User.findById(id, {
    }).then(function (user) {
      done(null, user)
    }).catch(function (err) {
      done(err, false)
    })
  })
}

module.exports.configureStrategy = function () {
  'use strict'
  passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne(
      {
        where: {
          userName: username
        }
      }).then(function (user) {
        if (!user) {
          return done(null, false, { errMsg: "User doesn't exist" })
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        // if (!user.validatePassword(password)) {
        //   return done(null, false, { errMsg: 'Password does not match' })
        // }
        return done(null, user)
      })
  }))
}

