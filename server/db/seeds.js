use portfilo;

db.dropDatabase();

db.stocks.insertMany([
  {
    companyName: "Google",
    ticker: "GOOGL",
    volumeOfStocks: 1,
    purchasePrice: 231.43
  },
  {
    companyName: "Apple",
    ticker: "AAPL",
    volumeOfStocks: 1,
    purchasePrice: 530.10
  }
]);
