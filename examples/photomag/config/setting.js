
module.exports = {
    development: {
        root: require('path').normalize(__dirname + '/..')
      , authenticator: 'authenticator'
      , db: 'mongodb://localhost:27017/photomag'
      , secret: 'photomag_secret'
      , i18n: {
          locales: ['en', 'de'],
          cookie: 'photomag_locale'
        }
      , facebook: {
            clientID: "135486393165197"
          , clientSecret: "f017d45a7c8286b6bdb2b91380a79ca0"
          , callbackURL: "http://localhost:3000/auth/facebook/callback"
          , permissions: ['email', 'user_about_me']
        }
    }
  , production: {

    }
}