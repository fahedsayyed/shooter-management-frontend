import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetails } from "src/types/Details";

interface DetailsState {
  details: {
    formSlideOne: IDetails;
  };
  detailById: any;
  athletesOfcompetitionAndMatchGroup :any;
  detailDateAndTime : any;
  addDateAndTimeResponse :any;
  response: any;
  loading: any;
  detailId:any;
  errors: {
    formSlideOne: Partial<IDetails>;
  };
}

const initialState: DetailsState = {
  details: {
    formSlideOne: {
      comp_id: null,
      competition_name: "",
      event_group: "",
      lane: "",
      reserved_lane: "",
      defective_lane: "",
      start_date: "",
      end_date: "",
      preparation_time: "",
      event_time: "",
      changeover_time: "",
      detailone: "",
    },
  },
  athletesOfcompetitionAndMatchGroup:[],
  detailId:null,
  detailById:[],
  detailDateAndTime:[],
  response: null,
  addDateAndTimeResponse : null,
  loading: null,
  errors: {
    formSlideOne: {},
  },
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setDetailsInReducer: (state: any, action: any) => {
      return {
        ...state,
        details: {
          ...state.details,
          formSlideOne: {
            ...state.details.formSlideOne,
            ...action.payload,
          },
        },
      };
    },
    setDetailsErrorInReducer: (state, action: PayloadAction<{ step: string; errors: Partial<IDetails> }>) => {
      const { step, errors } = action.payload;

      return {
        ...state,
        errors: {
          ...state.errors,
          [step]: errors,
        },
      };
    },
    resetDetailsState: () => initialState,

    addDetailId : (state,action)=>{
     state.detailId = action.payload
    },
    addDetailDateAndTime : (state,action)=>{
      state.detailDateAndTime = action.payload
    },

    addDetailRequest: (state, action) => {
      state.loading = true;
    },
    addDetailSuccess: (state, action) => {
      state.loading = false;
      state.response = action.payload;
    },
    addDetailFailure: (state, action) => {
      state.errors = action.payload;
    },
    getDetailByIdRequest: (state, action) => {
      state.loading = true;
    },
    getDetailByIdSuccess: (state, action) => {
      state.detailById = action.payload;
      state.loading = false;
    },
    getDetailByIdFailure: (state, action) => {
      state.errors = action.payload;
    },
    fetchtAthleteOfCompetitionandMatchGroupRequest: (state, action) => {
      state.loading = true;
    },
    fetchtAthleteOfCompetitionandMatchGroupSuccess: (state, action) => {
      state.athletesOfcompetitionAndMatchGroup = action.payload;
      state.loading = false;
    },
    fetchtAthleteOfCompetitionandMatchGroupFailure: (state, action) => {
      state.errors = action.payload;
    },
    addDetailsDateAndTimeRequest: (state, action) => {
      state.loading = true;
    },
    addDetailsDateAndTimeSuccess: (state, action) => {
      state.loading = false;
      state.addDateAndTimeResponse = action.payload;
    },
    addDetailsDateAndTimeFailure: (state, action) => {
      state.errors = action.payload;
    },
  },
});


export const { 
  setDetailsInReducer, 
  setDetailsErrorInReducer,
  addDetailDateAndTime,
  addDetailId,
  resetDetailsState,
  addDetailRequest,
  addDetailSuccess,
  addDetailFailure,
  getDetailByIdRequest,
  getDetailByIdSuccess,
  getDetailByIdFailure,
  fetchtAthleteOfCompetitionandMatchGroupRequest,
  fetchtAthleteOfCompetitionandMatchGroupSuccess,
  fetchtAthleteOfCompetitionandMatchGroupFailure,
  addDetailsDateAndTimeRequest,
  addDetailsDateAndTimeSuccess,
  addDetailsDateAndTimeFailure



} = detailsSlice.actions;
export default detailsSlice.reducer;
