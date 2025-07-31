const express = require('express');
const routes = require('./src/routes');
const app = express();
const {port} = require('./src/utils/secret');
const { connectDB } = require('./src/utils/db');
const { errorMiddleware } = require('./src/middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser({}))
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

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