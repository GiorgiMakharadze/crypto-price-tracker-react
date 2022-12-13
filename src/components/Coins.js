import styles from "./Coins.module.css";

const Coins = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
}) => {
  return (
    <div className={styles.coinContainer}>
      <div className={styles.coinRow}>
        <div className={styles.coin}>
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className={styles.coinSymbol}>{symbol}</p>
        </div>
        <div className={styles.coinData}>
          <p className={styles.coinPrice}>${price}</p>
          <p className={styles.coinVolume}>${volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <p className={styles.coinRed}>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className={styles.coinGreen}>{priceChange.toFixed(2)}%</p>
          )}

          <p className={styles.coinMarketcap}>
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coins;
