{nodetoo}
=========
Inspired by [Express mvc example](https://github.com/visionmedia/express/tree/master/examples/mvc), nodetoo is a MVC framework built on top of [Express](expressjs.com).

## Installation

    $ npm install -g nodetoo

## Quick Start

Assuming you have created a `project` with Express, please refer [here](http://expressjs.com/guide.html) for the guide.  

- Create the app

```
$ cd /project
$ npm install nodetoo
$ nodetoo
``` 

- Bootstrap nodetoo:

```js
var express = require('express');
var nodetoo = require('nodetoo');
var app = express();

app.configure(function(){
  ...
  
  // boostrap nodetoo
  nodetoo.bootstrap(app);
  
  app.use(app.router);
  ...
});

// remove any existing route
...

app.listen(3000);
```

- Start the server:

```
$ node app
```

## Project Structure

nodetoo only work on the `app/` and `config/` folder

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
config/
    injections/
    plugins/
    routes.js
    setting.js
```

## Models

Each js file under `models/` is a model, nodetoo will bootstrap all of them automatically. 

```
models/
  user.js
  post.js
  comment.js
```

## Controllers

Each folder under `controllers/` is a controller, `index.js` represent the js file.  
Let's take a look at the `controllers/home/index.js` file.

```js
exports.actions = {
  
  index: function (req, res) {
    res.render('home/index');
  },

  about: function (req, res) {
    res.render('home/about');
  },
}
```

__Filters__ are middlewares that run before the action function.

Exports as a function `before`.
```js
exports.before = function (req, res, next) {
    
  console.log('[BEFORE]: ' + req.url);
  next();
}

exports.actions = {
  
  index: function (req, res) {
    res.render('home/index');
  }
}
```

Exports as an object `before`, support [injection](#injections).

```js
exports.before = {
  
  all: [
    {
      middlewares: ['logger'],
      except: ['login']
    }
  ],
  only: [
    { 
      middlewares: ['watcher'],
      actions: ['login']
    }
  ]
};
```
```
All actions will use `logger` except `login` action.
Only `login` action will use `watcher`.
```

Define at action and it will be given priority.
```js
exports.actions = {
  
  index: {
    before: ['watcher', 'logger'],
    action: function (req, res) {
      res.render('home/index');
    }
  }
}
```

Here is the injections
```
config/
    injections/
        logger.js
        watcher.js
```

__Roles__ are use in [Authentication](#authentication) process.

Exports as an object `roles`.
```js
exports.roles = {

  all: [
    {
      roles: ['*'],
      except: ['login']
    }
  ],
  only: [
    {
      roles: ['user'],
      actions: ['createUser']
    },
    {
      roles: ['admin'],
      actions: ['createUser']
    },
  ]
};
```
```
All actions has role `*` except `login` action.
Only `createUser` action has role `user`.
Only `createUser` action has role `admin`.
```
PS: Role * apply to any roles, but it depend on how you write the authenticator.

Define at action and it will be given priority.
```js
exports.actions = {
  
  index: {
    roles: ['*'],
    action: function (req, res) {
      res.render('home/index');
    }
  }
}
```

## Actions

Action is a controller method and represent as `[controller].[method]`.

```
home.index
home.about
```

## Routes

Routes are defined in the `config/routes.js` file

```js
module.exports = [
    ['/'                        ,'get'  ,'home.index']
  , ['/about'                   ,'get'  ,'home.about']
]
```

## Authentication

When roles is configured, {nodetoo} will ask for an authenticator via [injection](#injections).

```
config/
    injections/
        authenticator.js
```

```js
module.exports = function(roles) {
  return function (req, res, next) {
    // retrieve user from session
    var user = req.session.user;
    if (user === undefined) {
      res.status(401).render('401');
    } 
    // asterisk skip authorization
    else if (!_.contains(roles, '*') 
          && !_.intersection(user.roles, roles).length > 0) {
      res.status(401).render('401');
    } else next();
  }
}
```
But how you write the authenticator, it is really up to you. 
Please refer to the [example](https://github.com/fliptoo/nodetoo/tree/master/examples/auth).

## Injections

Any module under `injections/` folder can be inject with the module filename without the extension.

```
config/
    injections/
        module.js
```

```
var module = inject('module');
```

PS: Actually nothing special with the injection, it is just a global function as `require`.

## Examples

Clone the nodetoo repo, then install the dev dependencies:

    $ git clone git://github.com/fliptoo/nodetoo.git --depth 1
    $ cd nodetoo
    $ npm install

and run whichever examples you want:

    $ cd examples/basic
    $ node app
    
# Credits

- [Express](https://github.com/visionmedia/express)
- [i18n-node](https://github.com/mashpie/i18n-node/)

## License

(The MIT License)

Copyright (c) 2013 Fliptoo &lt;fliptoo.studio@gmail.com&gt;

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
