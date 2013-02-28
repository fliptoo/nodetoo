
module.exports = [
    { routes : [
          ['/'                        ,'get'  ,'home.index']
        , ['/signup'                  ,'get'  ,'home.signup']
        , ['/signup'                  ,'post' ,'home.signup']
        , ['/login'                   ,'get'  ,'home.login']
        , ['/logout'                  ,'get'  ,'home.logout']
        , ['/auth/local'              ,'post' ,'home.localAuth']
        , ['/auth/facebook'           ,'get'  ,'home.fbAuth']
        , ['/auth/facebook/callback'  ,'get'  ,'home.fbAuthCalback']
    ]}

  , { roles  : ['*'],
      routes : [
          ['/about'                   ,'get'  ,'home.about']
    ]}
]