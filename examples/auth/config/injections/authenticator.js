
var _ = require('underscore');

module.exports = function(roles) {
  return function (req, res, next) {
    // retrieve user from session
    var user = req.session.user;
    if (user === undefined) {
      res.status(401).render('401');
    } 
    // asterisk skip authorization
    else if (!_.contains(roles, '*') 
          && !_.intersection(user.roles, roles).length > 0) {
      res.status(401).render('401');
    } else next();
  }
}