import {useSearchParams} from "react-router-dom";

function CoinDetails() {

    // TODO
    //  1. consume new HttpService endpoint getTradingDay
    //  2. render coin details, including lastPrice in the component

    let searchParams = useSearchParams()[0];
    const symbol = searchParams.get("symbol");

    return <h2>{symbol}</h2>;
}

export default CoinDetails;
