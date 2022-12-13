import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Coins from "./Coins";
import axios from "axios";
import styles from "./MainPage.module.css";

const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

const MainPage = () => {
  const [coin, setCoin] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => setCoin(res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, [url]);

  if (loading) {
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
      />
    );
  }

  const refetch = () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setCoin(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeHandler = (e) => {
    setSearchCoin(e.target.value);
  };

  const fileteredData = coin.filter((item) =>
    item.name.toLowerCase().includes(searchCoin.toLowerCase())
  );

  return (
    <div className={styles.coinApp}>
      <div className={styles.coinSearch}>
        <h1 className={styles.coinTxt}>Search a currency</h1>
        <form>
          <input
            className={styles.coinInput}
            type="text"
            onChange={changeHandler}
            placeholder="Search"
          />
        </form>
        <button onClick={refetch} className={styles.refetchCoins}>
          Update
        </button>
      </div>
      {fileteredData.map((item) => {
        return (
          <Coins
            key={item.id}
            name={item.name}
            price={item.current_price}
            symbol={item.symbol}
            marketcap={item.total_volume}
            volume={item.market_cap}
            image={item.image}
            priceChange={item.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
};
export default MainPage;
