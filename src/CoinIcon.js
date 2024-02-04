export default function CoinIcon(props) {
    const iconUrl = "https://www.bybit.com/bycsi-root/assets/image/coins/dark/" + props.symbol.toLowerCase() + ".svg";
    return <img style={{height: 35}} className={"icon"} src={iconUrl}/>
}