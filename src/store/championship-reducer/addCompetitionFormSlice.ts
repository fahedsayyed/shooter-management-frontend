// addCompetitionFormSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddCompetitionFormState {
  competitionData: {
    category_name: string;
    competitionName: string;
    competitionCode: string;
    mqs: string;
    target: string;
    creation: string;
    fromDate: Date | null;
    toDate: Date | null;
    registrationStart: Date | null;
    registrationEnd: Date | null;
    eligibilityDate: Date | null;
    lateFeeEndDate: Date | null;
    place: string;
    conductedBy: string;
    district: string;
    preferrd: [{ id: number; name: string }];
    organisers: [{ secretary_name: string; post: string }];
    circular: File | null;
  };
  selectedEvent: number[];
  steps: {
    step1: boolean;
  };
}

const initialState: AddCompetitionFormState = {
  competitionData: {
    category_name: "",
    competitionName: "",
    competitionCode: "",
    mqs: "",
    target: "",
    creation: "",
    fromDate: null,
    toDate: null,
    registrationStart: null,
    registrationEnd: null,
    eligibilityDate: null,
    lateFeeEndDate: null,
    place: "",
    conductedBy: "",
    district: "",
    preferrd: [{ id: 0, name: "" }],
    organisers: [{ secretary_name: "", post: "" }],
    circular: null,
  },
  selectedEvent: [],
  steps: {
    step1: false,
  },
};

const addCompetitionFormSlice = createSlice({
  name: "addCompetitionForm",
  initialState,
  reducers: {
    setCompetitionData: (state, action: PayloadAction<AddCompetitionFormState["competitionData"]>) => {
      state.competitionData = action.payload;
    },

    setSelectedEvent: (state, action: PayloadAction<number[]>) => {
      state.selectedEvent = action.payload;
    },

    setCheckError: (state, action) => ({
      ...state,
      steps: {
        step1: action.payload,
      },
    }),
  },
});

export const { setCompetitionData, setSelectedEvent, setCheckError } = addCompetitionFormSlice.actions;
export default addCompetitionFormSlice.reducer;
