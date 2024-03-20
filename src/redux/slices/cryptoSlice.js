import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  crypto: [],
  loading: "loading",
};

export const fetchCrypto = createAsyncThunk("fetch/Crypto", async () => {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});
export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    getCrypto: (state, action) => {
      state.crypto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCrypto.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(fetchCrypto.fulfilled, (state, action) => {
      state.crypto = action.payload;
      state.loading = "success";
    });
    builder.addCase(fetchCrypto.rejected, (state, action) => {
      state.loading = "error";
      state.crypto = [];
    });
  },
});

export const { getCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
