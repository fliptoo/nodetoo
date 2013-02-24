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
    
##Project Structure

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
##Controllers

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

##Actions

Action is a controller method and represent as `[controller].[method]`.

```
home.index
home.about
```

##Routes

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

## Features

  * Built on [Connect](http://github.com/senchalabs/connect)
  * Robust routing
  * HTTP helpers (redirection, caching, etc)
  * View system supporting 14+ template engines
  * Content negotiation
  * Focus on high performance
  * Environment based configuration
  * Executable for generating applications quickly
  * High test coverage

## Philosophy

  The Express philosophy is to provide small, robust tooling for HTTP servers. Making
  it a great solution for single page applications, web sites, hybrids, or public
  HTTP APIs.

  Built on Connect you can use _only_ what you need, and nothing more, applications
  can be as big or as small as you like, even a single file. Express does
  not force you to use any specific ORM or template engine. With support for over
  14 template engines via [Consolidate.js](http://github.com/visionmedia/consolidate.js)
  you can quickly craft your perfect framework.

## More Information

  * Join #express on freenode
  * [Google Group](http://groups.google.com/group/express-js) for discussion
  * Follow [tjholowaychuk](http://twitter.com/tjholowaychuk) on twitter for updates
  * Visit the [Wiki](http://github.com/visionmedia/express/wiki)
  * [日本語ドキュメンテーション](http://hideyukisaito.com/doc/expressjs/) by [hideyukisaito](https://github.com/hideyukisaito)
  * [Русскоязычная документация](http://express-js.ru/)
  * Run express examples [online](https://runnable.com/express)

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
