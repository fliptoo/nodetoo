
var fs = require('fs');
var path = require('path');
var i18n = require('./i18n');
var extend = require('xtend');
var _ = require('underscore');
var nodetoo = {};
var root = process.cwd();

/**
 * Injection for any module under './config/injections' folder
 * @api    global
 * @param  {String} name
 * @return {Anything}
 */
global.inject = function (name) {
  if (name === undefined)
    return null;
  return require(root + '/config/injections/' + name);
}

exports = module.exports = create();

/**
 * Create a notetoo singleton
 * @api    public
 */
function create() {

  if(!nodetoo.init) {
    nodetoo.init = true;
    var env = process.env.NODE_ENV || 'development';
    var settings = require(root + '/config/setting');
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

/**
 * bootstrap nodetoo
 * @api    public
 * @param  {Object} app
 */
nodetoo.bootstrap = function (app) {

  if (app !== null && typeof app != 'function') 
    throw new Error('{nodetoo} required express as the first argument.');

  // configure i18n
  i18nConfig(app);

  // configure models
  models();

  // configure views
  views(app);

  // configure controllers
  controllers(app);
};

/**
 * Configure i18n
 * @api    private
 * @param  {Object} app
 */
function i18nConfig(app) {
  i18n.configure(nodetoo.setting.i18n);
  app.use(i18n.init);
}

/**
 * Setup Models
 * @api    private
 */
function models() {
  fs.readdirSync(root + '/app/models').forEach(function (model) {
    require(root + '/app/models/' + model);
  })
}

/**
 * Setup Views
 * @api    private
 * @param  {Object} app
 */
function views(app) {
  app.set('views', root + '/app/views');
}

/**
 * Setup Controllers
 * @api    private
 * @param  {Object} app
 */
function controllers(app) {
  var controllers = {};
  var routes = require(root + '/config/routes');

  // install controllers
  scan(root + '/app/controllers', controllers);
 
  // routes mapping
  console.log('\n     ##### Routings #####\n');
  routes.forEach(function (route) {
    var path = route[0];
    var method = route[1];
    var actions = route[2];
    var folder = actions.substr(0, actions.lastIndexOf('.'));
    var file = actions.substr(actions.lastIndexOf('.')+1, actions.length);

    var controller = controllers[folder];
    var action = controller.actions[file];
    var middlewares = [];

    // install authenticator
    authenticator(controller, action, file, middlewares);

    // install before
    before(controller, action, file, middlewares);

    // register route
    app[method](path, _.uniq(middlewares), findAction(action));

    console.log('     %s %s -> %s', method.toUpperCase(), path, actions);
  });
  console.log('\n     ####################\n');
}


/**
 * Install authenticator
 * @api    private
 * @param  {Object} controller
 * @param  {Object|Function} action
 * @param  {String} file
 * @param  {Arrat} fns
 */
function authenticator(controller, action, file, fns) {
  if (controller.roles) {
    var all = controller.roles.all;
    var only = controller.roles.only;
    var roles = [];

    if (all) {
      all.forEach(function (i) {
        if (!i.except || !_.contains(i.except, file))
          roles = i.roles;
      });
    }

    if (only) {
      only.forEach(function (i) {
        if (_.contains(i.actions, file)) 
          roles = i.roles;
      });
    }

    // high priority for roles
    if (_.isObject(action) && action.roles) {
      roles = action.roles;
    }

    if (roles.length) {
      var authenticator = inject('authenticator');
      if (!authenticator) 
        throw new Error('Missing Authenticator');
      else 
        fns.push(authenticator(roles));
    }
  }
}

/**
 * Install middlewares
 * @api    private
 * @param  {Object} controller
 * @param  {Object|Function} action
 * @param  {String} file
 * @param  {String} fns
 */
function before(controller, action, file, fns) {
  // before at controller
  if (controller.before) {
    if (_.isFunction(controller.before)) {
      fns.push(controller.before); 
    } else {
      var all = controller.before.all;
      var only = controller.before.only;
      allForBefore(all, file, fns);
      onlyForBefore(all, file, fns);
    }
  }

  // before at action
  if (_.isObject(action) && action.before) {
    if (_.isFunction(action.before)) {
      fns.push(action.before); 
    } 
    else if (_.isArray(action.before)) {
      action.before.forEach(function(before) {
        if (_.isFunction(before)) {
          fns.push(before); 
        } else if (_.isString(before)) {
          var fn = inject(before);
            if (fn) fns.push(fn); 
        }
      });
    }
  }
}

/**
 * Find middlewares for 'all' and 'except'
 * @api    private
 * @param  {Array} all
 * @param  {String} file
 * @param  {Array} fns
 */
function allForBefore(all, file, fns) {
  if (all) {
    all.forEach(function (item) {
      if (!item.except || !_.contains(item.except, file)) {
        item.middlewares.forEach(function(middleware) {
          var fn = inject(middleware);
          if (fn) fns.push(fn); 
        });
      } 
    });
  }
}

/**
 * Find middlewares for 'only'
 * @api    private
 * @param  {Array} only
 * @param  {String} file
 * @param  {Array} fns
 */
function onlyForBefore(only, file, fns) {
  if (only) {
    only.forEach(function (item) {
      if (_.contains(item.actions, file)) {
        item.middlewares.forEach(function(middleware) {
          var fn = inject(middleware);
          if (fn) fns.push(fn); 
        });
      } 
    });
  }
}

/**
 * Find action
 * @api    private
 * @param  {Object|Function} action
 * @return {Function}
 */
function findAction(action) {
  if (_.isFunction(action)) 
    return action;
  return action.action;
}

/**
 * Scan for controllers
 * @api private
 * @param  {String} folder      
 * @param  {String} controllers
 */
function scan(folder, controllers) {
  fs.readdirSync(folder).forEach(function(file){
    var sub = folder + '/' + file;
    var stats = fs.statSync(sub);
    if (stats.isDirectory()) {
      scan(sub, controllers);
    } else {
      var controller = require(sub);
      sub = sub.substr(0, sub.length-3);
      if ('index' === path.basename(sub)) sub = path.normalize(sub + '/..');
      var name = path.relative(root + '/app/controllers', sub).replace('/', '.');
      controllers[name] = controller;
    }
  });
}