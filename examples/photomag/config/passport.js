
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.auth = function (roles) {
  return function (req, res, next) {
    if (!req.isAuthenticated()) {
      // remember url
      var originalUrl = req.flash('originalUrl');
      if (originalUrl != undefined) originalUrl = req.originalUrl;
      req.flash('originalUrl', originalUrl);
      return res.redirect('/login')
    } 
    // asterisk skip authorization
    else if (!_.contains(roles, '*') ) {
      if (!_.intersection(req.user.roles, roles).length > 0) {
        return res.status(401).render('401')
      }
    }
    next();
  }
}

exports.bootstrap = function (app) {
  
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

  app.post('/login', passport.authenticate(
      'local', { failureRedirect: '/login', failureFlash: true })
    , function(req, res) { 
      var originalUrl = req.flash('originalUrl');
      res.redirect(originalUrl != undefined ? '' + originalUrl : '/');
    }
  );
}
