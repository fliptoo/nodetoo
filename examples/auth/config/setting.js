
module.exports = {
    development: {
        authenticator: 'authenticator'
      , db: 'mongodb://localhost:27017/nodetoo'
      , i18n: {
          locales: ['en', 'zh-CN'],
          defaultLocale: 'en'
        }
    }
  , production: {
      
    }
}