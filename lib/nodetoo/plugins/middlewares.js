
module.exports = function(item, route, middlewares, nodetoo) {
  var injections = route[3];
  if (injections !== undefined) {
    injections.forEach(function(name) {
      var middleware = nodetoo.inject(name);
      if (middleware !== undefined)
        middlewares.push(middleware); 
    });
  }
}