
var passport = require("passport");

module.exports = passport.authenticate('local', { 
    failureRedirect: '/login'
  , failureFlash: true 
});