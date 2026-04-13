import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FAVORITES_STORAGE_KEY } from "@/constants";
import { RootState } from "@/store";

interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = {
  ids: [],
};

const loadInitial = (): FavoritesState => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return initialState;
    }

    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.ids)) {
      return parsed;
    }

    return initialState;
  } catch {
    return initialState;
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadInitial(),
  reducers: {
    toggleFavorite: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const index = state.ids.indexOf(id);

      if (index === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(index, 1);
      }

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify({ ids: state.ids }));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectIsFavorite = (state: RootState, id: string) => state.favorites.ids.includes(id);

export default favoritesSlice.reducer;
