# Yahoo-Financial-Data
Node.js module for accessing real time financial data from yahoo finance.

## Installation
```bash
$ npm install yahoo-financial-data
```

## Usage

```bash
var yahoo = require('yahoo-financial-data');
```
Get the current stock price.
```bash
yahoo.price('AAPL', function (err, data) {
    // 119.65
});
```

Get historical data for a given stock
```bash
// args
// 1. Ticker symbol
// 2. Desired Value ['high', 'low', 'open', 'close', 'volume']
// 3. Start Date
// 4. End Date
// 5. Interval ["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]

yahoo.history('AAPL', 'close', "2020-11-01", "2020-11-08", '1d', function (err, data) {
    //  [
    //    108.7699966430664,
    //    110.44000244140625,
    //    114.94999694824219,
    //    119.02999877929688,
    //    118.69000244140625
    //  ]
});
```

## Documentation

Choose from a wide range of available financial data to best fit your needs.\
Unit tests are currently in progress for most functions but all are currently available.

```bash
yahoo.analystRecomendation(ticker, callback)                     // Available; Testing In Progress
yahoo.assetType(ticker, callback)                                // Available; Testing In Progress
yahoo.companyName(ticker, callback)                              // Available; Testing In Progress
yahoo.dividendRate(ticker, callback)                             // Available; Testing In Progress
yahoo.dividendYield(ticker, callback)                            // Available; Testing In Progress
yahoo.earningsGrowth(ticker, callback)                           // Available; Testing In Progress
yahoo.exchange(ticker, callback)                                 // Available; Testing In Progress
yahoo.fiftyDayAverage(ticker, callback)                          // Available; Testing In Progress
yahoo.fiftyTwoWeekHigh(ticker, callback)                         // Available; Testing In Progress
yahoo.fiftyTwoWeekLow(ticker, callback)                          // Available; Testing In Progress
yahoo.fiveYearAvgDividendYield(ticker, callback)                 // Available; Testing In Progress
yahoo.forwardPE(ticker, callback)                                // Available; Testing In Progress
yahoo.freeCashflow(ticker, callback)                             // Available; Testing In Progress
yahoo.grossMargins(ticker, callback)                             // Available; Testing In Progress
yahoo.grossProfits(ticker, callback)                             // Available; Testing In Progress
yahoo.history(ticker, value, start, end, interval callback)      // Available; 
yahoo.marketCap(ticker, callback)                                // Available; 
yahoo.marketState(ticker, callback)                              // Available; Testing In Progress
yahoo.numberOfAnalystOpinions(ticker, callback)                  // Available; Testing In Progress
yahoo.operatingCashflow(ticker, callback)                        // Available; Testing In Progress
yahoo.operatingMargins(ticker, callback)                         // Available; Testing In Progress
yahoo.postMarketPrice(ticker, callback)                          // Available; Testing In Progress
yahoo.preMarketPrice(ticker, callback)                           // Available; Testing In Progress
yahoo.price(ticker, callback)                                    // Available; 
yahoo.priceToBook(ticker, callback)                              // Available; Testing In Progress
yahoo.profitMargins(ticker, callback)                            // Available; Testing In Progress
yahoo.returnOnAssets(ticker, callback)                           // Available; Testing In Progress
yahoo.returnOnEquity(ticker, callback)                           // Available; Testing In Progress
yahoo.revenueGrowth(ticker, callback)                            // Available; Testing In Progress
yahoo.revenuePerShare(ticker, callback)                          // Available; Testing In Progress
yahoo.targetHighPrice(ticker, callback)                          // Available; Testing In Progress
yahoo.targetLowPrice(ticker, callback)                           // Available; Testing In Progress
yahoo.targetMeanPrice(ticker, callback)                          // Available; Testing In Progress
yahoo.targetMedianPrice(ticker, callback)                        // Available; Testing In Progress
yahoo.totalCash(ticker, callback)                                // Available; Testing In Progress
yahoo.totalCashPerShare(ticker, callback)                        // Available; Testing In Progress
yahoo.totalDebt(ticker, callback)                                // Available; Testing In Progress
yahoo.totalRevenue(ticker, callback)                             // Available; Testing In Progress
yahoo.trailingPE(ticker, callback)                               // Available; Testing In Progress
yahoo.twoHundredDayAverage(ticker, callback)                     // Available; Testing In Progress
yahoo.volume(ticker, callback)                                   // Available;  
```
