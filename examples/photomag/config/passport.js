
var setting = require('../../../').setting;
var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

exports.bootstrap = function(app) {
  var User = mongoose.model('User');
  
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
      })
    }
  ))

  // use facebook strategy
  passport.use(new FacebookStrategy({
        clientID: setting.facebook.clientID
      , clientSecret: setting.facebook.clientSecret
      , callbackURL: setting.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          user = new User({
              name: profile.displayName
            , email: profile.emails[0].value
            , username: profile.username
            , roles: ['user']
            , provider: 'facebook'
            , facebook: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
        else {
          return done(err, user)
        }
      })
    }
  ))

  // app.post('/login', passport.authenticate(
  //     'local', { failureRedirect: '/login', failureFlash: true })
  //   , function(req, res) { 
  //     var originalUrl = req.flash('originalUrl');
  //     res.redirect(originalUrl != undefined ? '' + originalUrl : '/');
  //   }
  // );

  // app.get('/auth/facebook', passport.authenticate(
  //     'facebook', { scope: setting.facebook.permissions, failureRedirect: '/login', failureFlash: true })
  // );

  // app.get('/auth/facebook/callback', passport.authenticate(
  //     'facebook', { scope: setting.facebook.permissions, failureRedirect: '/login' })
  //   , function(req, res) { 
  //     var originalUrl = req.flash('originalUrl');
  //     res.redirect(originalUrl != undefined ? '' + originalUrl : '/');
  //   }
  // );
}
