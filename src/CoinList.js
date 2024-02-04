import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from 'react-router-dom';

import HttpService from './services/HttpService';
import MarketValue from "./MarketValue";
import CoinIcon from './CoinIcon';
import './CoinList.css';

const CurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function CoinList() {
    let dataLoaded = false;
    const [data, setData] = useState([]);

    function fetchCurrentQuotations() {
        HttpService.coinCap.getCurrentPrices().then(quotations => {
            setData(quotations.data);
        });
    }

    useEffect(() => {
        if (!dataLoaded) {
            dataLoaded = true;
            setInterval(fetchCurrentQuotations, 1000);
        }
    }, []);

    if (data.length > 0) {
        const rows = data.map((x, i) => {
            return <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                    <Link to={"/coin?symbol=" + x.symbol}>
                        <CoinIcon symbol={x.symbol}/>
                    </Link>
                </TableCell>
                <TableCell>{x.symbol}</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{CurrencyFormatter.format(x.priceUsd)}</TableCell>
                <TableCell><MarketValue>{x.changePercent24Hr}</MarketValue></TableCell>
                <TableCell>{CurrencyFormatter.format(x.volumeUsd24Hr)}</TableCell>
            </TableRow>

        })

        return <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Icons</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price USD</TableCell>
                        <TableCell>Change 24h %</TableCell>
                        <TableCell>Volume USD 24h</TableCell>
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


// TODO
//  strona danego coina(in progress)
//  * wykresy

export default CoinList;
