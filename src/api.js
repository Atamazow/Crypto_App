import { cryptoAssets, cryptoData } from "./data.js";
import axios from "axios";

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 100);
  });
}

export async function FetchAssets() {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
}

// https://api.coinlore.net/api/tickers/
