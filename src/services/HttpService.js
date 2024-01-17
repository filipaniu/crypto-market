class HttpService {

    binanceTicker24hUrl = "https://api4.binance.com/api/v3/ticker/24hr";
    coincapAssetsUrl = "https://api.coincap.io/v2/assets";

    getCurrentPrices() {
        const request = fetch(this.binanceTicker24hUrl);
        return request.then(results => results.json());
    }

    getCurrentPricesCoincap() {
        const request = fetch(this.coincapAssetsUrl);
        return request.then(results => results.json());
    }
}

module.exports = new HttpService();

