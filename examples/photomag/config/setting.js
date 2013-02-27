
module.exports = {
    development: {
        root: require('path').normalize(__dirname + '/..')
      , db: 'mongodb://localhost:27017/photomag'
      , secret: 'photomag_secret'
      , i18n: {
          locales: ['en', 'de'],
          cookie: 'photomag_locale'
        }
    }
  , production: {

    }
}