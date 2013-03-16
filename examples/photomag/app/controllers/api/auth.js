
var https = require('https');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.actions = {
  
  logout: function (req, res) {
    req.logout();
    res.send('Settle');
  },

  fb: function (req, res) {
    var token = req.param('token');
    var id = req.param('id');
    check(token, id, validate(id, req, res));
  },
}

function check(token, id, fn) {
  var options = {
    hostname: 'graph.facebook.com',
    path: '/me?access_token='+token,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    var result = '';
    res.on('data', function (chunk) {
      result += chunk;
    });

    res.on('end', function () {
      console.log(result);
      fn(res.statusCode, result);
    });

  });
  req.end();

  req.on('error', function(err) {
    console.error(err);
    fn(null, null, err);
  });
}

function validate(id, req, res) {
  return function (status, result, err) {
    if (err) {
      res.send(err);
      return;
    }

    if (status === 200) {
      var profile = JSON.parse(result);
      var valid = id === profile.id;
      if (valid) {
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
          if (err) { return res.send(err) }
          if (!user) {
            user = new User({
                name: profile.displayName
              , email: profile.emails[0].value
              , username: profile.username
              , roles: ['user']
              , provider: 'facebook'
              , facebook: profile._json
            })
            user.save(function (err) {
              req.logIn(user, function (err) {
               if (err) { throw err; }
               res.send(req.isAuthenticated());
              });
            })
          }
          else {
            req.logIn(user, function (err) {
             if (err) { throw err; }
             res.send(req.isAuthenticated());
            });
          }
        })
      } else {
        res.send(false);
      }
    } else {
      res.send(status, result);
    };
  }
}