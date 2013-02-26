
module.exports = [
  { routes : [
        ['/'                        ,'get'  ,'home.index']
      , ['/about'                   ,'get'  ,'home.about']
      , ['/login'                   ,'all'  ,'auth.login']
      , ['/logout'                  ,'get'  ,'auth.logout']
  ]}

, { roles  : ['*'],
    routes : [
        ['/anyone'                  ,'get'  ,'auth.anyone']
  ]}

, { roles  : ['user'],
    routes : [
        ['/user'                    ,'get'  ,'auth.user']
  ]}

, { roles  : ['admin'],
    routes : [
        ['/admin'                   ,'get'  ,'auth.admin']
  ]}

, { roles  : ['root'],
    routes : [
        ['/root'                    ,'get'  ,'auth.root']
  ]}

, { roles  : ['admin', 'root'],
    routes : [
        ['/mix'                     ,'get'  ,'auth.mix']
  ]}
]