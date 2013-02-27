
var express = require('./config/express');
var passport = require('./config/passport');
var mongoose = require('./config/mongoose');
var app = require('express')();

// bootstrap express
express.bootstrap(app);

// bootstrap mongoose
mongoose.bootstrap();

// bootstrap passport
passport.bootstrap(app);

// bootstrap application
app.listen(app.get('port'))
console.log('\nExpress app started on port ' + app.get('port'))
