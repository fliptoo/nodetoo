
module.exports = function(item, route, middlewares, nodetoo) {
  var fns = route[3];
  if (fns !== undefined) {
    fns.forEach(function(name) {
      var fn = inject(name);
      if (fn !== undefined)
        middlewares.push(fn); 
    });
  }
}