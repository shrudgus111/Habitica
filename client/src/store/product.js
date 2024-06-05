import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "products",
  initialState: {
    cost: null,
  },
  reducers: {
    initCosts: (state, action) => {
      state.cost = action.payload;
    },
  },
});

export const { initCosts } = productSlice.actions;

// export const fetchCosts = () => async (dispatch) => {};

export default productSlice.reducer;