const dictionaryRoute = require('./Dictionary');
const departmentRouter = require('./Department');
const categoriesRoute = require('./Category');
const wordRoute = require('./Word');

const routes = [
  {path:"/dictionary", route:dictionaryRoute},
  {path:"/department", route:departmentRouter},
  {path:"/category", route:categoriesRoute},
  {path:"/words", route:wordRoute},
]

module.exports = routes