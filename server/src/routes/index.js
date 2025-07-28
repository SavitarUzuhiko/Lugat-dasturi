const dictionaryRoute = require('./Dictionary');
const departmentRouter = require('./Department');

const routes = [
  {path:"/dictionary", route:dictionaryRoute},
  {path:"/department", route:departmentRouter}
]

module.exports = routes