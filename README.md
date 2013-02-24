{nodetoo}
=========
Inspired by [Express mvc example](https://github.com/visionmedia/express/tree/master/examples/mvc), nodetoo is a MVC framework built on top of [Express](expressjs.com).

## Installation

    $ npm install -g nodetoo

## Quick Start

 Create the app:

    $ npm install -g nodetoo
    $ express /tmp/foo && cd /tmp/foo
    $ nodetoo

 Install dependencies:

    $ npm install

 Start the server:

    $ node app
    
## Bootstrap

Only 1 line of code to bootstrap nodetoo with Express.

```js
var express = require('express');
var nodetoo = require('nodetoo');
var app = express();

// bootstrap nodetoo
nodetoo(app, __dirname + '/app');

app.listen(3000);
```
    
## Project Structure

nodetoo only work on the `app/` folder

```
app/
  controllers/
    home/
      index.js
  models/
      user.js
  views/
    home/
      index.jade
  routes.js
```
## Controllers

Each folder under `controllers/` is a controller, `index.js` represent the js file.  
Let's take a look at the `controllers/home/index.js` file.

```js
exports.index = function(req, res) {
  var user = req.session.user;
  res.render('home/index', {user: user});
};

exports.about = function(req, res) {
  res.render('home/about');
};
```

## Actions

Action is a controller method and represent as `[controller].[method]`.

```
home.index
home.about
```

## Routes

Routes are defined in the `app/route.js` file

```js
module.exports = [
// public routes  
  { routes : [
        ['/'                        ,'get'  ,'home.index']
      , ['/login'                   ,'all'  ,'user.login']
      , ['/logout'                  ,'get'  ,'user.logout']
  ]}

// user with any roles
, { roles  : ['*'],
    routes : [
        ['/anyone'                  ,'get'  ,'anyone.index']
  ]}

// user with admin role only
, { roles  : ['admin'],
    routes : [
        ['/admin'                    ,'get' ,'admin.index']
  ]}
]
```

## Authentication

nodetoo take the 3rd argument as the authentication middleware.

```js
var auth = function(roles) {
  return function (req, res, next) {
    if (req.session.user === undefined) {
      res.status(401).render('401');
    } 
    // asterisk skip authorization
    else if (!_.contains(roles, '*') 
          && !_.intersection(req.session.user.roles, roles).length > 0) {
      res.status(401).render('401');
    } else next();
  }
}

nodetoo(app, __dirname + '/app', auth);
```

## Viewing Examples

Clone the Express repo, then install the dev dependencies to install all the example / test suite deps:

    $ git clone git://github.com/visionmedia/express.git --depth 1
    $ cd express
    $ npm install

then run whichever tests you want:

    $ node examples/content-negotiation

## License

(The MIT License)

Copyright (c) 2009-2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
