
var fs = require('fs');
var path = require('path');
var i18n = require('./i18n');
var _ = require('underscore');
var nodetoo = exports;

nodetoo.boostrap = function(app, auth){

  if (app !== null && typeof app != 'function') 
    throw new Error('{nodetoo} required express as the first argument.');

  var root = process.cwd();

  // assign nodetoo a setting
  nodetoo.setting = require(root + '/config/setting');

  // configure i18n
  i18nConfig(app);

  // configure models
  models(root + '/app');

  // configure views
  views(app, root + '/app');

  // configure controllers
  controllers(app, root + '/app', auth);
};

function models(dir) {
  fs.readdirSync(dir + '/models').forEach(function (model) {
    require(dir + '/models/' + model);
  })
}

function views(app, dir) {
  app.set('views', dir + '/views');
}

function controllers(app, dir, auth) {
  var controllers = {};
  var routes = require(path.normalize(dir + '/../config/routes'));

  // controllers mapping
  fs.readdirSync(dir + '/controllers').forEach(function(name){
    var controller = dir + '/controllers/' + name;
    var stats = fs.statSync(controller);
    if (stats.isDirectory()) {
      var controller = require(controller)
      controllers[controller.name || name] = controller;
    }
  });

  // routes mapping
  console.log('\n     ##### Routing #####\n');
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
  console.log('\n     ###################\n');
}

function i18nConfig(app) {
  i18n.configure(nodetoo.setting.i18n);
  app.use(i18n.init);
}