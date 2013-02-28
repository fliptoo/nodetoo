
var express = require('express');
var passport = require('passport');
var mongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var nodetoo = require('../../../');
var setting = nodetoo.setting;

exports.bootstrap = function (app) {
  app.configure(function(){
    app.set('host', process.env.VCAP_APP_HOST || 'localhost');
    app.set('port', process.env.VMC_APP_PORT || 3000);
    app.set('view engine', 'jade');
    app.use(express.compress());
    app.use(express.logger('dev'));
    app.use(express.cookieParser())
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
      secret: setting.secret,
      store: new mongoStore({
        url: setting.db
      })
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.favicon());

    // bootstrap nodetoo
    nodetoo.bootstrap(app);

    app.use(app.router);
    app.use(require('stylus').middleware(setting.root + '/public'));
    app.use(express.static(setting.root + '/public'));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.configure('production', function(){
    app.use(function(err, req, res, next){
      console.error(err.stack)
      res.status(500).render('500', { error: err.stack })
    })
  });
}