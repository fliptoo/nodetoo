
module.exports = [

    ['/'                                ,'get'  ,'web.index']
  , ['/about'                           ,'get'  ,'web.about']
  , ['/signup'                          ,'get'  ,'web.auth.signup']
  , ['/signup'                          ,'post' ,'web.auth.signup']
  , ['/login'                           ,'get'  ,'web.auth.login']
  , ['/logout'                          ,'get'  ,'web.auth.logout']
  , ['/auth/local'                      ,'post' ,'web.auth.localAuth']
  , ['/auth/fb'                         ,'get'  ,'web.auth.fbAuth']
  , ['/auth/fb/callback'                ,'get'  ,'web.auth.fbAuthCalback']
]