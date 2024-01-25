import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import HttpService from './services/HttpService';
import './CoinList.css';
import MarketValue from "./MarketValue";
import {Link} from 'react-router-dom';

const CurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function CoinList() {
    let dataLoaded = false;
    const [data, setData] = useState([]);

    function fetchCurrentQuotations() {
        HttpService.getCurrentPricesCoincap().then(quotations => {
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
            const iconUrl = "https://cryptologos.cc/logos/thumbs/" + x.id + ".png";
            return <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                    <Link to={"/coin?symbol=" + x.symbol}>
                        <img className={"icon"} src={iconUrl}/>
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
//  strona danego coina
//  * wykresy

export default CoinList;
