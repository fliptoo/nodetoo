
var _ = require('underscore');

module.exports = function (roles) {
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
  };
} 