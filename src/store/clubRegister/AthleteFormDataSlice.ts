import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AthleteFormDataState {
  slideOne: {
    clubName: string;
    stateUnit: string;
    firstName: string;
    lastName: string;
    playingEvents: {
      rifle: boolean;
      pistol: boolean;
      shotgun: boolean;
    };
    education: string;
    dateOfBirth: Date | null;
    email: string;
    contactNumber: string;
    alternateContactNumber: string;
    gender: string;
    safetyCourse: boolean;
  };
  slideTwo: {
    //clubName: string;
    membership: string;
    aadhar: string;
    address: string;
    stateName: string;
    cityName: string;
    pincode: string;
    agreement: boolean;
    conscent: boolean;
  };
}

const initialState: AthleteFormDataState = {
  slideOne: {
    clubName: "",
    stateUnit: "MRA",
    firstName: "",
    lastName: "",
    playingEvents: {
      rifle: false,
      pistol: false,
      shotgun: false,
    },
    education: "",
    dateOfBirth: null,
    email: "",
    contactNumber: "",
    alternateContactNumber: "",
    gender: "male",
    safetyCourse: false,
  },
  slideTwo: {
    //clubName: "",
    membership: "",
    aadhar: "",
    address: "",
    stateName: "",
    cityName: "",
    pincode: "",
    agreement: false,
    conscent: false,
  },
};

const athleteFormDataSlice = createSlice({
  name: "athleteFormClubData",
  initialState,
  reducers: {
    setSlideOneFormData: (state, action) => {
      // state.slideOne = { ...state.slideOne, ...action.payload };
      return {
        ...state,
        slideOne: {
          ...state.slideOne,
          ...action.payload,
        },
      };
    },
    setSlideTwoFormData: (state, action /* : PayloadAction<Partial<AthleteFormDataState["slideTwo"]>> */) => {
      // state.slideTwo = { ...state.slideTwo, ...action.payload };
      return {
        ...state,
        slideTwo: {
          ...state.slideTwo,
          ...action.payload,
        },
      };
    },
  },
});

export const { setSlideOneFormData, setSlideTwoFormData } = athleteFormDataSlice.actions;
export default athleteFormDataSlice.reducer;
