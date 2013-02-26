
var express = require('express');
var http = require('http');
var path = require('path');
var user = require('./app/models/user');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('nodetoo'));
  app.use(express.session());

  // botstrap nodetoo
  require('../../')(app, __dirname + '/app', user.auth);

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('     Express + MVC = nodetoo');
  console.log('     Express server listening on port ' + app.get('port'));
});
