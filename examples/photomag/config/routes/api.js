
module.exports = [

    ['/api/auth/fb/:token/:id'          ,'get'    ,'api.auth.fb']
  , ['/api/auth/logout'                 ,'get'    ,'api.auth.logout']
  , ['/api/mag/list'                    ,'get'    ,'api.mag.list']
  , ['/api/mag/delete'                  ,'delete' ,'api.mag.delete']
  , ['/api/mag/create'                  ,'post'   ,'api.mag.create']
  , ['/api/mag/insertPage'              ,'post'   ,'api.mag.insertPage']
]