class HttpService {

    getCurrentPrices() {
        const request = fetch("https://api4.binance.com/api/v3/ticker/24hr");
        return request.then(results => results.json());
    }
}

module.exports = new HttpService();
