
var _ = require('underscore');

var user = {
    username: 'user'
  , password: 'password'
  , roles:    ['user']
}

var admin = {
    username: 'admin'
  , password: 'password'
  , roles:    ['admin']
}

var root = {
    username: 'root'
  , password: 'password'
  , roles:    ['root']
}

var mix = {
    username: 'mix'
  , password: 'password'
  , roles:    ['admin', 'root']
}

var users = [user, admin, root, mix];

exports.auth = function (roles) {
  return function (req, res, next) {
    if (req.session.user === undefined) {
      return res.status(401).render('401')
    } 
    // asterisk skip authorization
    else if (!_.contains(roles, '*') ) {
      if (!_.intersection(req.session.user.roles, roles).length > 0) {
        return res.status(401).render('401')
      }
    }
    next();
  }
}

exports.login = function (username, password, callback) {
  for(var i=0; i<users.length; i++){
    var user = users[i];
    if (user.username === username && user.password === password) {
      callback(user);
      break;
    }
  }
  callback();
}