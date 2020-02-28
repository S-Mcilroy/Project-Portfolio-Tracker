use portfilo;

db.dropDatabase();

db.stocks.insertMany([
  {
    companyName: "Google",
    ticker: "GOOGL",
    volumeOfStocks: 230,
    purchasePrice: 231.43
  },
  {
    companyName: "Apple",
    ticker: "AAPL",
    volumeOfStocks: 50,
    purchasePrice: 530.10
  },
  {
    companyName: "JP Morgan",
    ticker: "JPM-F",
    volumeOfStocks: 100,
    purchasePrice: 380.42
  }

]);
