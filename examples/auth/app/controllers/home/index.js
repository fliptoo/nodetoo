
exports.actions = {
  
  index: function (req, res) {
    var user = req.session.user;
    res.render('home/index', {user: user});
  },

  about: {
    before: function (req, res, next) {
      console.log('[BEFORE]: ' + req.url);
      next();
    },
    action: function (req, res) {
      res.render('home/about');
    }
  },
}