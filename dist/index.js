class YahooFinancialData {
    yahooFinanceDataV10 = require("../financeData/yahooFinanceDataV10");
    yahooFinanceDataV8 = require("../financeData/yahooFinanceDatav8");
    constructor() {
    }
    
    price(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["regularMarketPrice"]["raw"])
                {
                    completion(err, data["regularMarketPrice"])
                }
                else {
                    completion(err, data["regularMarketPrice"]["raw"])
                }
            }
            else {
                completion(err, null)
            }
        });
    }
    history(ticker, startDate, endDate, interval, completion) {
        this.yahooFinanceDataV8.price(ticker, startDate, endDate, interval, function(err, data) {
            if (!err) 
            {
                completion(err, data[0]["indicators"]["quote"][0]["close"])
            }
            else {
                completion(err, null)
            }
        })
    }
    preMarketPrice(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["preMarketPrice"]["raw"])
                {
                    completion(err, data["preMarketPrice"])
                }
                else {
                    completion(err, data["preMarketPrice"]["raw"])
                }
            }
            else {
                completion(err, null)
            }
        });
    }
    postMarketPrice(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["postMarketPrice"]["raw"])
                {
                    completion(err, data["postMarketPrice"])
                }
                else {
                    completion(err, data["postMarketPrice"]["raw"])
                }
            }
            else {
                completion(err, null)
            }
        });
    }
    marketCap(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["marketCap"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    volume(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["regularMarketVolume"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }









    dividendYield(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["dividendYield"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    dividendRate(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["dividendRate"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    fiveYearAvgDividendYield(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["fiveYearAvgDividendYield"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    forwardPE(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["forwardPE"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    trailingPE(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["trailingPE"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    fiftyTwoWeekLow(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["fiftyTwoWeekLow"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    fiftyTwoWeekHigh(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["fiftyTwoWeekHigh"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    fiftyDayAverage(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["fiftyDayAverage"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }
    twoHundredDayAverage(ticker, completion) {
        this.yahooFinanceDataV10.summaryDetail(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["twoHundredDayAverage"]["raw"])
            }
            else {
                completion(err, null)
            }
        });
    }













    assetType(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["quoteType"])
            }
            else {
                completion(err, null)
            }
        });
    }
    exchange(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["exchangeName"])
            }
            else {
                completion(err, null)
            }
        });
    }
    companyName(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["longName"])
            }
            else {
                completion(err, null)
            }
        });
    }
    marketState(ticker, completion) {
        this.yahooFinanceDataV10.price(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["marketState"])
            }
            else {
                completion(err, null)
            }
        });
    }
    
    priceToBook(ticker, completion) {
        this.yahooFinanceDataV10.defaultKeyStatistics(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["priceToBook"]["raw"])
                {
                    completion(err, data["priceToBook"])
                }
                else {
                    completion(err, data["priceToBook"]["raw"])
                }
            }
            else {
                completion(err, null)
            }
        });
    }

    targetHighPrice(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["targetHighPrice"]["raw"])
                    completion(err, data["targetHighPrice"]);
                else
                    completion(err, data["targetHighPrice"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    targetLowPrice(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["targetLowPrice"]["raw"])
                    completion(err, data["targetLowPrice"]);
                else
                    completion(err, data["targetLowPrice"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    targetMeanPrice(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["targetMeanPrice"]["raw"])
                    completion(err, data["targetMeanPrice"]);
                else
                    completion(err, data["targetMeanPrice"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    targetMedianPrice(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["targetMedianPrice"]["raw"])
                    completion(err, data["targetMedianPrice"]);
                else
                    completion(err, data["targetMedianPrice"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    analystRecomendation(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                completion(err, data["recommendationKey"])
            }
            else {
                completion(err, null)
            }
        });
    }
    numberOfAnalystOpinions(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["numberOfAnalystOpinions"]["raw"])
                    completion(err, data["numberOfAnalystOpinions"]);
                else
                    completion(err, data["numberOfAnalystOpinions"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    totalCash(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["totalCash"]["raw"])
                    completion(err, data["totalCash"]);
                else
                    completion(err, data["totalCash"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    totalCashPerShare(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["totalCashPerShare"]["raw"])
                    completion(err, data["totalCashPerShare"]);
                else
                    completion(err, data["totalCashPerShare"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    totalDebt(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["totalDebt"]["raw"])
                    completion(err, data["totalDebt"]);
                else
                    completion(err, data["totalDebt"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    totalRevenue(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["totalRevenue"]["raw"])
                    completion(err, data["totalRevenue"]);
                else
                    completion(err, data["totalRevenue"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    revenuePerShare(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["revenuePerShare"]["raw"])
                    completion(err, data["revenuePerShare"]);
                else
                    completion(err, data["revenuePerShare"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }

    returnOnAssets(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["returnOnAssets"]["raw"])
                    completion(err, data["returnOnAssets"]);
                else
                    completion(err, data["returnOnAssets"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    returnOnEquity(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["returnOnEquity"]["raw"])
                    completion(err, data["returnOnEquity"]);
                else
                    completion(err, data["returnOnEquity"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }

    grossProfits(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["grossProfits"]["raw"])
                    completion(err, data["grossProfits"]);
                else
                    completion(err, data["grossProfits"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    freeCashflow(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["freeCashflow"]["raw"])
                    completion(err, data["freeCashflow"]);
                else
                    completion(err, data["freeCashflow"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    operatingCashflow(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["operatingCashflow"]["raw"])
                    completion(err, data["operatingCashflow"]);
                else
                    completion(err, data["operatingCashflow"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }

    earningsGrowth(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["earningsGrowth"]["raw"])
                    completion(err, data["earningsGrowth"]);
                else
                    completion(err, data["earningsGrowth"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    revenueGrowth(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["revenueGrowth"]["raw"])
                    completion(err, data["revenueGrowth"]);
                else
                    completion(err, data["revenueGrowth"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }

    grossMargins(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["grossMargins"]["raw"])
                    completion(err, data["grossMargins"]);
                else
                    completion(err, data["grossMargins"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    operatingMargins(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["operatingMargins"]["raw"])
                    completion(err, data["operatingMargins"]);
                else
                    completion(err, data["operatingMargins"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
    profitMargins(ticker, completion) {
        this.yahooFinanceDataV10.financialData(ticker, function (err, data) {
            if (!err) 
            {
                if (!data["profitMargins"]["raw"])
                    completion(err, data["profitMargins"]);
                else
                    completion(err, data["profitMargins"]["raw"]);
            }
            else {
                completion(err, null)
            }
        });
    }
}


module.exports = new YahooFinancialData();
