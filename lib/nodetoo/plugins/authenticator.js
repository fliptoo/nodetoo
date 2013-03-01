
module.exports = function(item, route, middlewares, nodetoo) {
  var roles = item.roles;
  if (roles != undefined) {
    var authenticator = inject(nodetoo.setting.authenticator);
    if (authenticator === undefined) 
      throw new Error('Please configure an authenticator');
    else 
      middlewares.push(authenticator(roles)); 
  }
}