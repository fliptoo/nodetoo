
var _ = require('underscore');

/**
 * User Database
 * @type {Array}
 */
var users = [
  {
      username: 'user'
    , password: 'password'
    , roles:    ['user']
  },
  {
      username: 'admin'
    , password: 'password'
    , roles:    ['admin']
  },
  {
      username: 'root'
    , password: 'password'
    , roles:    ['root']
  },
  {
      username: 'mix'
    , password: 'password'
    , roles:    ['admin', 'root']
  }
]

/**
 * Authentication base on roles
 * @param  {Array} roles
 * @return {[Function]}       
 */
exports.auth = function(roles) {
  return function (req, res, next) {
    if (req.session.user === undefined) {
      res.status(401).render('401');
    } 
    // asterisk skip authorization
    else if (!_.contains(roles, '*') 
          && !_.intersection(req.session.user.roles, roles).length > 0) {
      res.status(401).render('401');
    } else next();
  }
}

/**
 * Login with username and password
 * @param  {String}   username 
 * @param  {String}   password 
 * @param  {Function} callback            
 */
exports.login = function(username, password, callback) {
  for(var i=0; i<users.length; i++){
    var user = users[i];
    if (user.username === username && user.password === password) {
      callback(null, user);
      break;
    }
  }
  callback(new Error("Bad Credentials"));
}