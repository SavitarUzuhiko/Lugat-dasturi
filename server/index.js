const express = require('express');
const routes = require('./src/routes');
const app = express();
const {port} = require('./src/utils/secret');
const { connectDB } = require('./src/utils/db');
const { errorMiddleware } = require('./src/middlewares/error.middleware');

app.use(express.json());

routes.forEach(element => {
  app.use(element.path, element.route);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errorMiddleware);

app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening on port http://localhost:${port}`)
})