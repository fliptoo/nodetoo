
module.exports = [
    { routes : [
          ['/'                        ,'get'  ,'home.index']
    ]}

  , { roles  : ['*'],
      routes : [
          ['/about'                   ,'get'  ,'home.about']
    ]}
]