
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['facebook'];

/**
 * Define Schema
 */

var User = new Schema({
    name              : String
  , email             : String
  , username          : String
  , provider          : String
  , hashed_password   : String
  , salt              : String
  , roles             : []
  , facebook          : {}
  , twitter           : {}
  , github            : {}
  , google            : {}
})

/**
 * Define Virtual
 */

User.virtual('password')
    .set(function (password) {
      this._password = password
      this.salt = this.makeSalt()
      this.hashed_password = this.encryptPassword(password)
    })
    .get(function() { return this._password })

/**
 * Setup Validation
 */

// must not be null or empty
var validatePresenceOf = function (value) {
  return value && value.length
}

// the below 4 validations only apply if you are signing up traditionally
User.path('name').validate(function (name) {
  if (authTypes.indexOf(this.provider) !== -1) return true
  return name.length
}, 'Name cannot be blank')

User.path('email').validate(function (email) {
  if (authTypes.indexOf(this.provider) !== -1) return true
  return email.length
}, 'Email cannot be blank')

User.path('username').validate(function (username) {
  if (authTypes.indexOf(this.provider) !== -1) return true
  return username.length
}, 'Username cannot be blank')

User.path('hashed_password').validate(function (hashed_password) {
  if (authTypes.indexOf(this.provider) !== -1) return true
  return hashed_password.length
}, 'Password cannot be blank')

// pre save hooks
User.pre('save', function (next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
    next(new Error('Invalid password'))
  else
    next()
})

/**
 * Define Method
 */

User.methods.authenticate = function(plainText) {
  return this.encryptPassword(plainText) === this.hashed_password
}

User.methods.makeSalt = function() {
  return Math.round((new Date().valueOf() * Math.random())) + ''
}

User.methods.encryptPassword = function(password) {
  if (!password) return ''
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
}

/**
 * Compile Model
 */

mongoose.model('User', User);
