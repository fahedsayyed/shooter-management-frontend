import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MatchDataState {
  matchData: any[]; // You can replace 'any' with a more specific type for your match data
  loading: boolean;
  error: string | null;
}

const initialState: MatchDataState = {
  matchData: [],
  loading: false,
  error: null,
};

const matchDataSlice = createSlice({
  name: "matchData",
  initialState,
  reducers: {
    fetchMatchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMatchDataSuccess: (state, action: PayloadAction<any[]>) => {
      state.matchData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMatchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMatchDataStart, fetchMatchDataSuccess, fetchMatchDataFailure } = matchDataSlice.actions;
export default matchDataSlice.reducer;
