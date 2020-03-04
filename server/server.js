const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db =client.db('portfolio');
  const stocksCollection = db.collection('stocks');
  const apiCollection = db.collection('api');
  const stocksRouter = createRouter(stocksCollection);
  const apiRouter = createRouter(apiCollection);
  app.use('/api/stocks', stocksRouter);
  app.use('/api/api', apiRouter);
})
.catch(console.err);

app.listen(3000, function() {
  console.log(`Listening on port ${ this.address().port}`);
})
