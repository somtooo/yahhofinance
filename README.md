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
analystRecomendation         
assetType                    
companyName                  
dividendRate                 
dividendYield                
earningsGrowth               
exchange                     
fiftyDayAverage              
fiftyTwoWeekHigh             
fiftyTwoWeekLow              
fiveYearAvgDividendYield     
forwardPE                    
freeCashflow                 
grossMargins                 
grossProfits                 
history
marketCap
marketState                  
numberOfAnalystOpinions      
operatingCashflow            
operatingMargins             
postMarketPrice              
preMarketPrice               
price               
priceToBook        
profitMargins       
returnOnAssets         
returnOnEquity         
revenueGrowth       
revenuePerShare        
targetHighPrice                    
targetLowPrice                     
targetMeanPrice                    
targetMedianPrice                    
totalCash                    
totalCashPerShare                    
totalDebt                    
totalRevenue                    
trailingPE                    
twoHundredDayAverage                    
volume                                  
```
