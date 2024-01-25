import {useSearchParams} from "react-router-dom";

function CoinDetails() {
    let searchParams = useSearchParams()[0];
    const symbol = searchParams.get("symbol");

    return <h2>{symbol}</h2>;
}

export default CoinDetails;
