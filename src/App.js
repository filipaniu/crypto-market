import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function loadData() {
    const request = fetch("https://api4.binance.com/api/v3/ticker/24hr");
    return request.then(results => results.json());
}

function App() {

    let dataLoaded = false;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (!dataLoaded) {
            dataLoaded = true;
            loadData().then(quotations => setData(quotations));
        }
    }, []);

    let tableView = "No data";
    if (data.length > 0) {
        const rows = data.map(x => {
            return <tr>
                <td>{x.symbol}</td>
                <td>{x.askPrice}</td>
                <td>{x.bidPrice}</td>
                <td>{x.lastPrice}</td>
                <td>{x.volume}</td>
            </tr>
        })
        tableView = <table>
            <tr>
                <th>Symbol</th>
                <th>Ask price</th>
                <th>Bid price</th>
                <th>Last price</th>
                <th>Volume</th>
            </tr>
            {rows}
        </table>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>Crypto Market</h2>
                <img src={logo} className="App-logo" alt="logo"/>
                {tableView}
            </header>
        </div>
    );
}

export default App;
