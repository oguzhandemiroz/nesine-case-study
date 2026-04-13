import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Bet } from "@/features/bets/types";
import type { RootState } from "@/store";
import { API_URL } from "@/constants";

const betsAdapter = createEntityAdapter<Bet, string>({
  selectId: (bet) => bet.C,
});

export const fetchBets = createAsyncThunk<Bet[], void, { rejectValue: string }>(
  "bets/fetch",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await fetch(API_URL, { signal });

      if (!response.ok) {
        return rejectWithValue(`HTTP ${response.status}`);
      }

      const data: Bet[] = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw err;
      }
      return rejectWithValue(err instanceof Error ? err.message : "Bilinmeyen hata");
    }
  },
);

const initialState = betsAdapter.getInitialState({
  status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  error: null as string | null,
});

const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    betUpdated: (state, action: PayloadAction<{ id: string; changes: Partial<Bet> }>) => {
      betsAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBets.fulfilled, (state, action) => {
        betsAdapter.setAll(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchBets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Veri alınamadı";
      });
  },
});

export const { betUpdated } = betsSlice.actions;

export const {
  selectAll: selectAllBets,
  selectById: selectBetById,
  selectIds: selectBetIds,
  selectTotal: selectBetsTotal,
  selectEntities: selectBetEntities,
} = betsAdapter.getSelectors((state: RootState) => state.bets);

export const selectBetsStatus = (state: RootState) => state.bets.status;
export const selectBetsError = (state: RootState) => state.bets.error;

export default betsSlice.reducer;
