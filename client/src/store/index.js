import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import productReducer from "./product";

const store = configureStore({
  reducer: {
    game: gameReducer,
    product: productReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
