
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