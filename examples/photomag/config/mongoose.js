
var mongoose = require('mongoose');
var nodetoo = require('../../../');

exports.bootstrap = function () {
  var setting = nodetoo.setting;
  var db = mongoose.connect(setting.db).connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
      console.log('Mongo connected ' + setting.db)
  });
}