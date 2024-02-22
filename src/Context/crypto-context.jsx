import { createContext, useContext, useEffect, useState } from "react";
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

  function mapAssets(result, assets) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        ...asset,
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      };
    });
  }

  useEffect(() => {
    async function preLoad() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const fetchedAssets = await FetchAssets();
      setAssets(mapAssets(result, fetchedAssets));
      setCrypto(result);
      setLoading(false);
    }
    preLoad();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => {
      const updatedAssets = [...prev, newAsset];
      return mapAssets(crypto, updatedAssets);
    });
  }

  return (
    <CryptoContext.Provider value={{ loading, assets, crypto, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
