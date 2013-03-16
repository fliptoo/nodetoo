
module.exports = [

    ['/'                        ,'get'  ,'home.index']
  , ['/about'                   ,'get'  ,'home.about']
  , ['/login'                   ,'all'  ,'auth.login']
  , ['/logout'                  ,'get'  ,'auth.logout']
  , ['/anyone'                  ,'get'  ,'auth.anyone']
  , ['/user'                    ,'get'  ,'auth.user']
  , ['/admin'                   ,'get'  ,'auth.admin']
  , ['/root'                    ,'get'  ,'auth.root']
  , ['/mix'                     ,'get'  ,'auth.mix']
]