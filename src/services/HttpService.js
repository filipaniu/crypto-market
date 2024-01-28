class HttpService {

    binance = {
        baseUrl: "https://api4.binance.com/api/v3/",
        getCurrentPrices() {
            return fetch(this.baseUrl + "ticker/24hr").then(x => x.json());
        },
        getTradingDay(symbol) {
            return fetch(this.baseUrl + "ticker/tradingDay?symbol=" + symbol).then(x => x.json());
        }
    };

    coinCap = {
        baseUrl: "https://api.coincap.io/v2/",
        getCurrentPrices() {
            return fetch(this.baseUrl + "assets").then(x => x.json());
        }
    };
}

module.exports = new HttpService();
