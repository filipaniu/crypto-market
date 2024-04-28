export default function CoinIcon(props) {
    // TODO, replace below bybit with locally hosted images
    const iconUrl = "icons/" + props.symbol.toLowerCase() + ".svg";
    return <img style={{height: 35}} className={"icon"} src={iconUrl}/>
}