
var user = require('../../models/user');

exports.login = function(req, res) {
  if (req.method === 'POST') {
    var username = req.param('username');
    var password = req.param('password');
    user.login(username, password, function (err, user){
      if (err) {
        res.render('auth/login', {error: err})
      } else {
        req.session.user = user;
        res.redirect('/');
      }
    });
  } else {
    res.render('auth/login')
  }
};

exports.logout = function(req, res) {
  delete req.session.user;
  res.redirect('/');
}

exports.anyone = function(req, res) {
  res.render('auth/anyone')
};

exports.anyone = function(req, res) {
  res.render('auth/anyone')
};

exports.user = function(req, res) {
  res.render('auth/user')
};

exports.admin = function(req, res) {
  res.render('auth/admin')
};

exports.root = function(req, res) {
  res.render('auth/root')
};

exports.mix = function(req, res) {
  res.render('auth/mix')
};