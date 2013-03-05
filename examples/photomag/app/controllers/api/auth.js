
var https = require('https');

exports.fb = function(req, res) {
  var token = req.param('token');
  var id = req.param('id');
  check(token, id, validate(res));
};

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

function validate(res) {
  return function (status, result, err) {
    if (err) {
      res.send(err);
      return;
    }

    if (status === 200) {
      var profile = JSON.parse(result);
      res.send(id + ' | ' + profile.id);
    } else {
      res.send(status, result);
    };
  }
}