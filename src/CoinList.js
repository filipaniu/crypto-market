import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import HttpService from './services/HttpService';
import MarketValue from "./MarketValue";
import CoinIcon from './CoinIcon';
import './CoinList.css';
import {useNavigate} from "react-router-dom";

const CurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function CoinList() {
    let dataLoaded = false;
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    function fetchCurrentQuotations() {
        HttpService.coinCap.getCurrentPrices().then(quotations => {
            setData(quotations.data);
        });
    }

    useEffect(() => {
        let intervalID;
        if (!dataLoaded) {
            dataLoaded = true;
            intervalID = setInterval(fetchCurrentQuotations, 1000);
        }
        return function cleanup() {
            clearInterval(intervalID);
        };
    }, []);

    if (data.length > 0) {
        const rows = data.map((x, i) => {
            return <TableRow key={i} onClick={() => navigate("/coin?symbol=" + x.symbol)} className="coinRow">
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                    <CoinIcon symbol={x.symbol}/>
                </TableCell>
                <TableCell>{x.symbol}</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{CurrencyFormatter.format(x.priceUsd)}</TableCell>
                <TableCell><MarketValue>{x.changePercent24Hr}</MarketValue></TableCell>
                <TableCell>{CurrencyFormatter.format(x.volumeUsd24Hr)}</TableCell>
                <TableCell>{CurrencyFormatter.format(x.marketCapUsd)}</TableCell>
            </TableRow>

        })

        return <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: "0.5vw"}}></TableCell>
                        <TableCell>Icons</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price USD</TableCell>
                        <TableCell>Change 24h %</TableCell>
                        <TableCell>Volume USD 24h</TableCell>
                        <TableCell>Market Cap</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>;
    } else {
        return "No data";
    }
}

export default CoinList;
