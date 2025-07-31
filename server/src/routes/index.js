const routes = [
  {path:"/dictionary", route:require('./Dictionary')},
  {path:"/department", route:require('./Department')},
  {path:"/category", route:require('./Category')},
  {path:"/words", route:require('./Word')},
  {path:"/auth", route:require('./Auth')},
  {path:'/upload', route: require('./Upload')}
]

module.exports = routes