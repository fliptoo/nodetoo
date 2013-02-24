
var fs = require('fs')
  , _ = require('underscore')

module.exports = function(app, dir, auth){

  if (app !== null && typeof app != 'function') 
    throw new Error('Nodetoo required express as the first argument.');
  if (dir !== null && typeof dir != 'string') 
    throw new Error('Nodetoo required dir as the second argument.');

  // configure models
  models(dir);

  // configure views
  views(app, dir);

  // configure controllers
  controllers(app, dir, auth);
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
  var routes = require(dir + '/routes');

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
          console.warn('     Nodetoo missing auth as the third argument when role is configured.');
      }
      
      // register route
      app[method](path, middlewares, callback);
      console.log('     %s %s -> %s', method.toUpperCase(), path, action);
    });
  });
  console.log('\n     ###################\n');
}