
var env = process.env.NODE_ENV || 'development'
var setting = {
    development: {
      db: 'mongodb://localhost:27017/nodetoo',
      i18n: {
        locales: ['en', 'zh-CN'],
        defaultLocale: 'en'
      }
    }
  , production: {

    }
}

// Export module
module.exports = setting[env];