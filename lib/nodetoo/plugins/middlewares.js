
module.exports = function(item, route, middlewares, nodetoo) {
  var wares = route[3];
  if (wares !== undefined) {
    wares.forEach(function(ware) {
      var middleware = nodetoo.inject[ware];
      if (middleware !== undefined)
        middlewares.push(middleware); 
    });
  }
}