import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice'
// import memberReducer from './member'


export const store = configureStore({
  reducer: {
    game: gameReducer,
    //  members : memberReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export default store; 