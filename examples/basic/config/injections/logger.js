
module.exports = function (req, res, next) {
  console.log('[LOG]   : ' + req.url);
  next();
}