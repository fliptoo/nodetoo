
var setting = require("../../../../").setting;
var passport = require("passport");

module.exports = passport.authenticate('facebook', { 
    scope: setting.facebook.permissions
  , failureRedirect: '/login'
  , failureFlash: true 
});