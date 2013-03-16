
var express = require('express');
var swagger = require('swagger-jack');
var setting = require('../../../').setting;
var yaml = require('js-yaml');

exports.bootstrap = function (app) {

  app.use(swagger.generator(app, 
    {
      apiVersion: '1.0',
      basePath: 'http://' + app.get('host') + ':' + app.get('port')
    }, 
    [{
      api: require('./swagger/auth.yml'),
      controller: require('../app/controllers/api/auth')
    },
    {
      api: require('./swagger/mag.yml'),
      controller: require('../app/controllers/api/mag')
    }])
  );
  app.use(swagger.validator(app));
  app.use(swagger.errorHandler());

  // Serve up swagger ui at /docs via static route
  var docs_handler = express.static(setting.root + '/public/swagger/');
  app.get(/^\/swagger(\/.*)?$/, function(req, res, next) {
    if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
      res.writeHead(302, { 'Location' : req.url + '/' });
      res.end();
      return;
    }
    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr('/swagger'.length);
    return docs_handler(req, res, next);
  });
}