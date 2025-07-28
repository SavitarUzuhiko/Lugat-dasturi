const dictionaryRoute = require('./Dictionary');
const departmentRouter = require('./Department');
const categoriesRoute = require('./Category');

const routes = [
  {path:"/dictionary", route:dictionaryRoute},
  {path:"/department", route:departmentRouter},
  {path:"/category", route:categoriesRoute},
]

module.exports = routes