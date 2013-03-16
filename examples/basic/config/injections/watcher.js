
module.exports = function (req, res, next) {
  console.log('[WATCH] : ' + req.url);
  next();
}