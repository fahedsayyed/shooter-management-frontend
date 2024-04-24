import { createSlice } from "@reduxjs/toolkit";

interface atheleteState {
  athleteList:any,
  Athlete:any,
  loading:boolean
  error:any,
  response : any,


}

const initialState : atheleteState = {
  athleteList: [],
  Athlete:[],
  loading:false,
  response : null,
  error:null,

};

export const atheleteSlice = createSlice({
  name: 'athelete',
  initialState,
  reducers: {
  
      fetchAthleteListStart: state => {
        state.loading = true;
      },
      fetchAthleteListSuccess: (state, action) => {
        state.loading = false;
        state.athleteList = action.payload;
        state.error = null;
      },
      fetchAthleteListFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateAthleteStatusStart: (state,action) => {
        state.loading = true;
      },
      updateAthleteStatusSuccess: (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.error = null;
      },
      updateAthleteStatusFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      fetchSingleAthleteRequest :(state,action)=>{
        state.loading = false
      }, 
      fetchSingleAthleteSuccess : (state,action)=>{
        state.Athlete = action.payload
        state.loading = false
      },
      fetchSingleAthleteFailure : (state,action)=>{
        state.loading = true
        state.error =action.payload
      },
 
},
});

export const {

    fetchAthleteListStart,
    fetchAthleteListSuccess,
    fetchAthleteListFailure,
    updateAthleteStatusStart,
    updateAthleteStatusSuccess,
    updateAthleteStatusFailure,
    fetchSingleAthleteRequest,
    fetchSingleAthleteSuccess,
    fetchSingleAthleteFailure

 } = atheleteSlice.actions;


export default atheleteSlice.reducer;
