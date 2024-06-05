import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import memberReducer from './member'
import boardReducer from './board'

const store = configureStore({
  reducer: {
    game: gameReducer,
    members : memberReducer,
    boards : boardReducer
  },
  devTools: import.meta.env.DEV,
});

export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
