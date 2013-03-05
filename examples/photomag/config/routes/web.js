
module.exports = [
    { routes : [
          ['/'                                ,'get'  ,'home.index']
        , ['/signup'                          ,'get'  ,'home.signup']
        , ['/signup'                          ,'post' ,'home.signup']
        , ['/login'                           ,'get'  ,'home.login']
        , ['/logout'                          ,'get'  ,'home.logout']
        , ['/auth/local'                      ,'post' ,'home.localAuth']
        , ['/auth/fb'                         ,'get'  ,'home.fbAuth']
        , ['/auth/fb/callback'                ,'get'  ,'home.fbAuthCalback',  ['fbPassport']]
    ]}

  , { roles  : ['*'],
      routes : [
          ['/about'                           ,'get'  ,'home.about']
    ]}
]