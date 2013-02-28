var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require("passport");
var nodetoo = require("../../../../../");

var afterAuth = function(req, res) {
  var originalUrl = req.flash('originalUrl');
  res.redirect(originalUrl != undefined ? '' + originalUrl : '/');
};

exports.index = function(req, res) {
  res.render('home/index')
};

exports.about = function(req, res) {
  res.render('home/about');
};

exports.signup = function(req, res) {
  if (req.method === 'GET')
    res.render('home/signup', { title: 'Sign up', user: new User() });
  else {
    var user = new User(req.body)
    user.provider = 'local'
    user.roles = ['user'];
    user.save(function (err) {
      if (err) {
        return res.render('home/signup', { errors: err.errors, user: user })
      }
      req.logIn(user, function(err) {
        if (err) return next(err)
        return res.redirect('/')
      })
    })
  }
};

exports.login = function(req, res) {
  res.render('home/login');
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.localAuth = function(req, res) {
  afterAuth(req, res);
};

exports.fbAuth = nodetoo.inject('fbPassport');

exports.fbAuthCalback = function(req, res) {
    afterAuth(req, res);
};
