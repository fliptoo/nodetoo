
exports.before = function (req, res, next) {
  console.log('[BEFORE]: ' + req.url);
  next();
}

exports.actions = {
  
  /**
   * Home Page
   * @api    private/public
   * @param  {[type]} req
   * @param  {[type]} res
   * @return {[type]}
   */
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