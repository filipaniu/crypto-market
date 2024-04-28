import * as _ from "lodash";

import HttpService from './HttpService';

class ExchangeInfo {

    counter = 0;

    symbols = [];

    constructor() {
        console.log("HTTP request for Exchange info (should run only once)");
        HttpService.binance.getExchangeInfo().then(response => {
            this.symbols = _.map(response.symbols, c => _.pick(c, ['symbol', 'baseAsset', 'quoteAsset']));
        });
    }
    // TODO - issue with get method called before async code in constructor get executed
    get(symbol) {
        console.log(this.symbols.length);
       const found =  _.find(this.symbols,{symbol:symbol});
       if(found){
           return found;
       }
       else {
            console.log(found);
            console.error("Not found", symbol, ++this.counter);
       }
    }
}

const exchangeInfoSingletonService = new ExchangeInfo();
export default exchangeInfoSingletonService;
