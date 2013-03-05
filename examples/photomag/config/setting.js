
module.exports = {
    development: {
        root: require('path').normalize(__dirname + '/..')
      , db: 'mongodb://localhost:27017/photomag'
      , secret: 'photomag_secret'
      , i18n: {
          locales: ['en', 'de'],
          cookie: 'photomag_locale'
        }
      , facebook: {
            clientID: "123662521020871"
          , clientSecret: "90007df94a252fdae7d32eba1c123620"
          , callbackURL: "http://localhost:3000/auth/facebook/callback"
          , permissions: ['email', 'user_about_me']
        }
    }
  , production: {

    }
}