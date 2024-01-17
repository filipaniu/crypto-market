import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import HttpService from './services/HttpService';
import './CoinList.css';
import MarketValue from "./MarketValue";

function CoinList() {
    let dataLoaded = false;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!dataLoaded) {
            dataLoaded = true;
            HttpService.getCurrentPricesCoincap().then(quotations => {
                console.log(quotations);
                setData(quotations.data);
            });
        }
    }, []);

    if (data.length > 0) {
        const rows = data.map((x, i) => {
            const iconUrl = "https://cryptologos.cc/logos/thumbs/" + x.id + ".png";
            return <TableRow key={i}>
                <TableCell><img className={"icon"} src={iconUrl}/></TableCell>
                <TableCell>{x.symbol}</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.priceUsd}</TableCell>
                <TableCell><MarketValue>{x.changePercent24Hr}</MarketValue></TableCell>
                <TableCell>{x.volumeUsd24Hr}</TableCell>
            </TableRow>
        })
        return <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
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
// 2. czerwone i zielone czcionki
// 3. formatowanie liczb
// 4. Pełne nazwy
// 5. klikalne pierwsze ikony
// 6. * wykresy

export default CoinList;
