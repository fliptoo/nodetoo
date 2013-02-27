
var fs = require('fs');
var path = require('path');
var i18n = require('./i18n');
var extend = require('xtend');
var _ = require('underscore');
var nodetoo = {};

exports = module.exports = create();

function create() {
  if(!nodetoo.init) {
    nodetoo.init = true;
    nodetoo.root = process.cwd();
    var env = process.env.NODE_ENV || 'development';
    var settings = require(nodetoo.root + '/config/setting');
    nodetoo.setting = extend(settings.development, settings[env]);


    console.log('                      _      _                      ');
    console.log('                     | |    | |                     ');
    console.log('      _ __   ___   __| | ___| |_ ___   ___          ');
    console.log('     | \'_ \\ / _ \\ / _` |/ _ \\ __/ _ \\ / _ \\   ');
    console.log('     | | | | (_) | (_| |  __/ || (_) | (_) |        ');
    console.log('     |_| |_|\\___/ \\__,_|\\___|\\__\\___/ \\___/   ');
    console.log('');
  }
  return nodetoo;
}

nodetoo.boostrap = function(app, auth) {

  if (app !== null && typeof app != 'function') 
    throw new Error('{nodetoo} required express as the first argument.');

  // configure i18n
  i18nConfig(app);

  // configure models
  models();

  // configure views
  views(app);

  // configure controllers
  controllers(app, auth);
};

function models() {
  fs.readdirSync(nodetoo.root + '/app/models').forEach(function (model) {
    require(nodetoo.root + '/app/models/' + model);
  })
}

function views(app) {
  app.set('views', nodetoo.root + '/app/views');
}

function controllers(app, auth) {
  var controllers = {};
  var routes = require(nodetoo.root + '/config/routes');

  // controllers mapping
  fs.readdirSync(nodetoo.root + '/app/controllers').forEach(function(name){
    var controller = nodetoo.root + '/app/controllers/' + name;
    var stats = fs.statSync(controller);
    if (stats.isDirectory()) {
      var controller = require(controller)
      controllers[controller.name || name] = controller;
    }
  });

  // routes mapping
  console.log('\n     ##### Routings #####\n');
  routes.forEach(function(i) {
    var roles = i.roles;
    var routes = i.routes;

    if (roles != undefined) console.log('\n     [%s]', roles);

    routes.forEach(function(route) {
      var path = route[0];
      var method = route[1];
      var action = route[2];
      var controller = controllers[action.split('.')[0]];
      var callback = controller[action.split('.')[1]];

      // middleware
      var middlewares = controller.middlewares;
      if (!middlewares) middlewares = [];
      if (roles != undefined) {
        if (auth !== null && typeof auth === 'function')
          middlewares.push(auth(roles));
        else 
          console.warn('     {nodetoo} missing auth as the third argument when role is configured.');
      }
      
      // register route
      app[method](path, middlewares, callback);
      console.log('     %s %s -> %s', method.toUpperCase(), path, action);
    });
  });
  console.log('\n     ####################\n');
}

function i18nConfig(app) {
  i18n.configure(nodetoo.setting.i18n);
  app.use(i18n.init);
}