import { createSlice } from "@reduxjs/toolkit";

interface atheleteState {
  matchGroups: any;
  matchesOfMatchgroupId: any;
  athleteOfMatches: any;
  matchGroupDetails: any;
  seriesTitle: any;
  scores: any;
  totalScore: any;
  loading: boolean;
  error: any;
  response: any;
  scoreDetails: any[] | null;
}

const initialState: atheleteState = {
  matchGroups: [],
  matchesOfMatchgroupId: [],
  loading: false,
  athleteOfMatches: [],
  matchGroupDetails: [],
  seriesTitle: [],
  scores: [],
  totalScore: 0,
  error: null,
  response: null,
  scoreDetails: null,
};

export const scoreEntrySlice = createSlice({
  name: "scoreEntry",
  initialState,
  reducers: {
    saveScores: (state, action) => {
      state.scores = action.payload;
    },
    fetchMatchGroupListStart: (state, action) => {
      state.loading = true;
    },
    fetchMatchGroupListSuccess: (state, action) => {
      state.loading = false;
      state.matchGroups = action.payload;
      state.error = null;
    },
    fetchMatchGroupListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMatchesByMatchgroupIdStart: (state, action) => {
      state.loading = true;
    },
    fetchMatchesByMatchgroupIdSuccess: (state, action) => {
      state.loading = false;
      state.matchesOfMatchgroupId = action.payload;
      state.error = null;
    },
    fetchMatchesByMatchgroupIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAthleteByMatchStart: (state, action) => {
      state.loading = true;
    },
    fetchAthletesByMatchSuccess: (state, action) => {
      state.loading = false;
      state.athleteOfMatches = action.payload;
      state.error = null;
    },
    fetchAthletesByMatchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMatchGroupDetailStart: (state, action) => {
      state.loading = true;
    },
    fetchMatchGroupDetailSuccess: (state, action) => {
      state.loading = false;
      state.matchGroupDetails = action.payload;
      state.error = null;
    },
    fetchMatchGroupDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMatchGroupSeriesTitleStart: (state, action) => {
      state.loading = true;
    },
    fetchMatchGroupSeriesTitleSuccess: (state, action) => {
      state.loading = false;
      state.seriesTitle = action.payload;
      state.error = null;
    },
    fetchMatchGroupSeriesTitleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addScoreEntryRequest: (state, action) => {
      state.loading = true;
    },
    addScoreEntrySuccess: (state, action) => {
      state.loading = false;
      state.response = action.payload;
    },
    addScoreEntryFailure: (state, action) => {
      state.error = action.payload;
    },
    addTotalScore: (state, action) => {
      state.totalScore = action.payload;
    },
    //scoreDetails
    fetchScoreDetailsStart: (state, action) => {
      state.loading = true;
      const { competition_id } = action.payload;
    },
    fetchScoreDetailsSuccess: (state, action) => {
      state.loading = false;
      state.scoreDetails = action.payload;
      state.error = null;
    },
    fetchScoreDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMatchGroupListStart,
  fetchMatchGroupListSuccess,
  fetchMatchGroupListFailure,
  fetchMatchesByMatchgroupIdStart,
  fetchMatchesByMatchgroupIdSuccess,
  fetchMatchesByMatchgroupIdFailure,
  fetchAthleteByMatchStart,
  fetchAthletesByMatchSuccess,
  fetchAthletesByMatchFailure,
  fetchMatchGroupDetailStart,
  fetchMatchGroupDetailSuccess,
  fetchMatchGroupDetailFailure,
  fetchMatchGroupSeriesTitleStart,
  fetchMatchGroupSeriesTitleSuccess,
  fetchMatchGroupSeriesTitleFailure,
  addScoreEntryRequest,
  addScoreEntrySuccess,
  addScoreEntryFailure,
  saveScores,
  addTotalScore,
  fetchScoreDetailsStart,
  fetchScoreDetailsSuccess,
  fetchScoreDetailsFailure,
} = scoreEntrySlice.actions;

export default scoreEntrySlice.reducer;
