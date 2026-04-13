import { configureStore } from "@reduxjs/toolkit";
import betsReducer from "@/features/bets/store/betsSlice";
import favoritesReducer from "@/features/bets/store/favoritesSlice";

export const store = configureStore({
  reducer: {
    bets: betsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["bets/fetch/fulfilled"],
        ignoredPaths: ["bets.entities"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
