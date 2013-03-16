
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Define Schema
 */

var Mag = new Schema({
    name            : String
  , code            : String
  , about           : String
  , createdAt       : Date
  , pages           : [{img : Buffer}]
});

/**
 * Define Static Method
 */

Mag.statics.create = function (name, code, about, createdAt, fn) {
  var mag = new this();
  mag.name = name;
  mag.code = code;
  mag.about = about;
  mag.createdAt = createdAt;
  mag.save(function (err) {
    if (err) fn(err);
    return fn(err, mag);
  });
}

/**
 * Define Instance Method
 */

Mag.methods.insertPage = function (page, index, fn) {
  this.pages.create({ img: page });
  this.save(function (err) {
    if (err) fn(err);
    return fn(err, this);
  });
} 

Mag.methods.removePage = function (index, fn) {
  this.pages.push(page);
  this.save(function (err) {
    if (err) fn(err);
    return fn(err, this);
  });
} 

/**
 * Compile Model
 */

mongoose.model('Mag', Mag);
