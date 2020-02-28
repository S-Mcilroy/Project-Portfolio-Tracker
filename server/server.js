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
  const db =client.db('portfilo');
  const stocksCollection = db.collection('stocks');
  const stocksRouter = createRouter(stocksCollection);
  app.use('/api/stocks', stocksRouter);
})
.catch(console.err);

app.listen(3000, function() {
  console.log(`Listening on port ${ this.address().port}`);
})
