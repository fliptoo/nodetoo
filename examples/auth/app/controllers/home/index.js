
exports.index = function(req, res) {
  var user = req.session.user;
  res.render('home/index', {user: user});
};

exports.about = function(req, res) {
  res.render('home/about');
};