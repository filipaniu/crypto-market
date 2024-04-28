export default function CoinIcon(props) {
    // TODO, replace below bybit with locally hosted images
    const iconUrl = "https://www.bybit.com/bycsi-root/assets/image/coins/dark/" + props.symbol.toLowerCase() + ".svg";
    return <img style={{height: 35}} className={"icon"} src={iconUrl}/>
}