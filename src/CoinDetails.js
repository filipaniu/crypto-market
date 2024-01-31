import {useSearchParams} from "react-router-dom";
import HttpService from './services/HttpService';
import {useEffect} from "react";

function CoinDetails() {

    // TODO
    //  2. render coin details, including lastPrice in the component

    let searchParams = useSearchParams()[0];
    const symbol = searchParams.get("symbol");

    useEffect(() => {
        const currencyPair = symbol + "USDT";
        HttpService.binance.getTradingDay(currencyPair).then((result) => {
            console.log(result);
        });
    }, [symbol]);

    return <h2>{symbol}</h2>;
}

export default CoinDetails;
