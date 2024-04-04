import {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import * as _ from "lodash";

export default function CandlestickChart(props) {

    const formatter = new Intl.DateTimeFormat('pl-PL', {timeStyle: 'medium'});
    const [chartData, setChartData] = useState([["Time", "Low", "Open", "Close", "High"]]);

    function setupWebSockets(symbol) {
        const address = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1s`;
        const WS = new WebSocket(address);
        WS.onopen = () => console.log(`WebSocket ${address} has been opened`);
        WS.onerror = (error) => console.log("WebSocket error", error);
        WS.onclose = (msg) => console.log("WebSocket has been closed", msg);
        WS.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            console.log(data.E);
            const candle = [
                formatter.format(data.E),
                parseFloat(data.k.l),
                parseFloat(data.k.o),
                parseFloat(data.k.c),
                parseFloat(data.k.h)
            ]
            chartData.push(candle);
            setChartData(chartData);
        };
    }

    useEffect(() => {
        if (_.isEmpty(props.symbol)) {
            return;
        }
        setupWebSockets(props.symbol);
    }, [props.symbol]);

    if (chartData.length > 5) {
        return <Chart
            key="CandlestickChart"
            chartType="CandlestickChart"
            data={chartData}
            width="100%"
            height="750px"
            options={{chartArea: {width: "90%"},legend:{position:"top"}, title: "1s " + props.symbol}}
            legendToggle/>
    } else {
        return <p>Please wait...</p>
    }

}