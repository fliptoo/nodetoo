
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require("passport");
var nodetoo = require("../../../../../");

exports.actions = {
  
  signup: function (req, res) {
    if (req.method === 'GET')
      res.render('auth/signup', { title: 'Sign up', user: new User() });
    else {
      var user = new User(req.body)
      user.provider = 'local'
      user.roles = ['user'];
      user.save(function (err) {
        if (err) {
          return res.render('auth/signup', { errors: err.errors, user: user })
        }
        req.logIn(user, function(err) {
          if (err) return next(err)
          return res.redirect('/')
        })
      })
    }
  },

  login: function (req, res) {
    res.render('auth/login', {feedback: req.flash('error')});
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  about: function (req, res) {
    res.render('web/about');
  },

  localAuth: function (req, res) {
    afterAuth(req, res);
  },

  fbAuth: inject('fbPassport'),

  fbAuthCalback: function (req, res) {
    afterAuth(req, res);
  },
}

function afterAuth(req, res) {
  var originalUrl = req.flash('originalUrl');
  res.redirect(originalUrl != undefined ? '' + originalUrl : '/');
};
