const routes = [
  {path:"/dictionary", route:require('./Dictionary')},
  {path:"/department", route:require('./Department')},
  {path:"/category", route:require('./Category')},
  {path:"/words", route:require('./Word')},
  {path:'/upload', route: require('./Upload')}
]

module.exports = routes