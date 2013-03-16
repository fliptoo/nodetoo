
var fs = require('fs');
var mongoose = require('mongoose');
var Mag = mongoose.model('Mag');

exports.actions = {
  
  list: function (req, res, next) {
    Mag.find(function (err, mags){
      if (err) { return next(err) }
      res.json(mags);
    });
  },

  delete: function (req, res, next) {
    var id = req.param('id');
    Mag.remove(id, function (err, mags){
      if (err) { return next(err) };
      res.json(1);
    });
  },

  create: function (req, res, next) {
    var name = req.param('name');
    var code = req.param('code');
    var about = req.param('about');

    Mag.create(name, code, about, new Date(), function (err, mag){
      if (err) next(err);
      res.json(mag);
    });
  },

  insertPage: function (req, res, next) {
    var id = req.param('id');
    var index = req.param('index');
    var image = req.files.image;

    if (undefined === image)
      next(new Error('Image is required'));

    Mag.findOne(id, function (err, mag) {
      if (err) { return next(err) };
      if (!mag) { return next(new Error('Mag not found')) };

      fs.readFile(image.path, function (err, data) {
        mag.insertPage(data, index, function (err, mag) {
          if (err) next(err);
          res.json(mag);
        });
      });
    });
  },

  viewPage: function (req, res) {
    Post.findById(req.params.id, function (err, post) {
      res.writeHead('200', { 'Content-Type': post.img.contentType });
        res.end(post.img.data,'binary');
    });
  },
}