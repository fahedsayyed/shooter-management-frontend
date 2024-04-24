import { createSlice } from "@reduxjs/toolkit";

interface atheleteState {
  matchParticipationList: any;
  competition: any;
  competitionDetail: any;
  events: any;
  matchParticipationDetailList: any;
  approveAnddisapproveParticipatant: any;
  allMatchParticipationList: any;
  matchDetailsByCompetition: any;
  preferedLocation: any;
  competitionId: any;
  athletesOfcompetition: any;
  loading: boolean;
  error: any;
  response: any;
}

const initialState: atheleteState = {
  matchParticipationList: [],
  competition: [],
  competitionDetail: {},
  events: [],
  matchParticipationDetailList: [],
  approveAnddisapproveParticipatant: [],
  matchDetailsByCompetition: [],
  allMatchParticipationList: [],
  competitionId: [],
  preferedLocation: [],
  athletesOfcompetition: [],
  loading: false,
  error: null,
  response: null,
};

export const CompetitionSlice = createSlice({
  name: "AllMatchParticipation",
  initialState,
  reducers: {
    fetchCompetitionListStart: (state) => {
      state.loading = true;
    },
    fetchCompetitionListSuccess: (state, action) => {
      state.loading = false;
      state.competition = action.payload;
      state.error = null;
    },
    fetchCompetitionListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMatchParticipationListStart: (state, action) => {
      state.loading = true;
    },
    fetchMatchParticipationListSuccess: (state, action) => {
      state.loading = false;
      state.matchParticipationList = action.payload;
      state.error = null;
    },
    fetchMatchParticipationListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // addCompetitionDetail: (state, action) => {
    //   state.competitionDetail = action.payload;
    // },
    fetchCompetitionByIdStart: (state, action) => {
      state.loading = true;
    },
    fetchCompetitionByIdSuccess: (state, action) => {
      state.loading = false;
      state.competitionDetail = action.payload;
      state.error = null;
    },
    fetchCompetitionByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchEventsListStart: (state, action) => {
      state.loading = true;
    },
    fetchEventsListSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.error = null;
    },
    fetchEventsListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMatchEntryRequest: (state, action) => {
      state.loading = true;
    },
    addMatchEntrySuccess: (state, action) => {
      state.loading = false;
      // state.response = action.payload
    },
    addMatchEntryFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchPendingCompetitionListStart: (state) => {
      state.loading = true;
    },
    fetchPendingCompetitionListSuccess: (state, action) => {
      state.loading = false;
      state.matchParticipationList = action.payload;
      state.error = null;
    },
    fetchPendingCompetitionListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchMatchParticipationDtailListStart: (state, action) => {
      state.loading = true;
    },
    fetchMatchParticipationDetailListSuccess: (state, action) => {
      state.loading = false;
      state.matchParticipationDetailList = action.payload;
      state.error = null;
    },
    fetchMatchParticipationDetailListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAthleteMatchStatusRequest: (state, action) => {
      state.loading = true;
    },
    updateAthleteMatchStatusSuccess: (state, action) => {
      state.loading = false;
      state.response = action.payload;
    },
    updateAthleteMatchStatusFailure: (state, action) => {
      state.error = action.payload;
    },
    editUpdateAthleteMatchStatusRequest: (state, action) => {
      state.loading = true;
    },
    editUpdateAthleteMatchStatusSuccess: (state, action) => {
      state.loading = false;
      state.approveAnddisapproveParticipatant = action.payload;
    },
    editUpdateAthleteMatchStatusFailure: (state, action) => {
      state.error = action.payload;
    },
    getUpcomingMatchParticipationListRequest: (state, action) => {
      state.loading = true;
    },
    getUpcomingMatchParticipationListSuccess: (state, action) => {
      state.loading = false;
      state.allMatchParticipationList = action.payload;
    },
    getUpcomingMatchParticipationListFailure: (state, action) => {
      state.error = action.payload;
    },
    getMatchDetailListBycompetitionRequest: (state, action) => {
      state.loading = true;
    },
    getMatchDetailListBycompetitionSuccess: (state, action) => {
      state.loading = false;
      state.matchDetailsByCompetition = action.payload;
    },
    getMatchDetailListBycompetitionFailure: (state, action) => {
      state.error = action.payload;
    },
    addCompetitionId: (state, action) => {
      state.competitionId = action.payload;
    },
    getPreferedLocationByCompetitionRequest: (state, action) => {
      state.loading = true;
    },
    getPreferedLocationByCompetitionSuccess: (state, action) => {
      state.loading = false;
      state.preferedLocation = action.payload;
    },
    getPreferedLocationByCompetitionFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchtAthleteOfCompetitionStart: (state, action) => {
      state.loading = true;
    },
    fetchtAthleteOfCompetitionSuccess: (state, action) => {
      state.athletesOfcompetition = action.payload;
      state.loading = false;
    },
    fetchtAthleteOfCompetitionFailure: (state, action) => {
      state.error = action.payload;
    }
   
  },
});

export const {
  fetchCompetitionListStart,
  fetchCompetitionListSuccess,
  fetchCompetitionListFailure,
  fetchMatchParticipationListStart,
  fetchMatchParticipationListSuccess,
  fetchMatchParticipationListFailure,
  fetchCompetitionByIdStart,
  fetchCompetitionByIdSuccess,
  fetchCompetitionByIdFailure,
  fetchEventsListStart,
  fetchEventsListSuccess,
  fetchEventsListFailure,
  addMatchEntryRequest,
  addMatchEntrySuccess,
  addMatchEntryFailure,
  fetchMatchParticipationDtailListStart,
  fetchMatchParticipationDetailListSuccess,
  fetchMatchParticipationDetailListFailure,
  updateAthleteMatchStatusRequest,
  updateAthleteMatchStatusSuccess,
  updateAthleteMatchStatusFailure,
  editUpdateAthleteMatchStatusRequest,
  editUpdateAthleteMatchStatusSuccess,
  editUpdateAthleteMatchStatusFailure,
  getUpcomingMatchParticipationListRequest,
  getUpcomingMatchParticipationListSuccess,
  getUpcomingMatchParticipationListFailure,
  getMatchDetailListBycompetitionRequest,
  getMatchDetailListBycompetitionSuccess,
  getMatchDetailListBycompetitionFailure,
  getPreferedLocationByCompetitionRequest,
  getPreferedLocationByCompetitionSuccess,
  getPreferedLocationByCompetitionFailure,
  addCompetitionId,
  fetchtAthleteOfCompetitionStart,
  fetchtAthleteOfCompetitionSuccess,
  fetchtAthleteOfCompetitionFailure
} = CompetitionSlice.actions;

export default CompetitionSlice.reducer;
