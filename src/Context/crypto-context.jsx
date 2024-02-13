import { createContext, useEffect, useState } from "react";
import { fakeFetchCrypto, FetchAssets } from "../api.js";
import { percentDifference } from "../utils.js";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preLoad() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await FetchAssets();
      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setCrypto(result);
      setLoading(false);
    }
    preLoad();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, assets, crypto }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
