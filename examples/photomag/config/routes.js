
var _ = require('underscore');
var web = require('./routes/web');
var api = require('./routes/api');

module.exports = _.union(web, api);