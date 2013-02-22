
exports.index = function(req, res) {
  var user = req.session.user;
  if (user !== undefined) {
    res.render('home/index', {user: user})
  } else res.render('home/index')
};

exports.about = function(req, res) {
  res.render('home/about');
};