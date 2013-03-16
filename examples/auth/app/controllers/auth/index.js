
var user = require('../../models/user');

exports.roles = {

  all: [
    {
      roles: ['*'],
      except: ['login']
    }
  ],
  only: [
    {
      roles: ['user'],
      actions: ['user']
    },
    {
      roles: ['admin'],
      actions: ['admin']
    },
  ]
};

exports.before = {
  
  all: [
    {
      middlewares: ['logger'],
      except: ['login']
    }
  ],
  only: [
    { 
      middlewares: ['watcher'],
      actions: ['login']
    }
  ]
};

exports.actions = {
  
  login: function (req, res) {
    if (req.method === 'POST') {
      var username = req.param('username');
      var password = req.param('password');
      user.login(username, password, function (err, user){
        if (err) {
          res.render('auth/login', {error: err});
        } else {
          req.session.user = user;
          res.redirect('/');
        }
      });
    } else {
      res.render('auth/login');
    }
  },

  logout: function (req, res) {
    delete req.session.user;
    res.redirect('/');
  },

  anyone: function (req, res) {
    res.render('auth/anyone');
  },

  user: function (req, res) {
    res.render('auth/user');
  },

  admin: function (req, res) {
    res.render('auth/admin');
  },

  root: {
    roles: ['root'],
    action: function (req, res) {
      res.render('auth/root');
    }
  },

  mix: {
    roles: ['admin', 'root'],
    action: function (req, res) {
      res.render('auth/mix');    
    }
  }
}