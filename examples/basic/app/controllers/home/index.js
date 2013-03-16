
exports.before = function (req, res, next) {
  console.log('[BEFORE]: ' + req.url);
  next();
}

exports.actions = {
  
  index: function (req, res) {
    res.render('home/index');
  },

  about: {
    before: ['watcher', 'logger'],
    action: function (req, res) {
      res.render('home/about');
    }
  }
}