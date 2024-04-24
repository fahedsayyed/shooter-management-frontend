import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosServices from "src/utils/axios";
import { notifyMessage } from "src/utils/toastNotify";

interface AthleteState {
  isLoading: boolean;
  athleteId: string | null;
  athleteResponse: any;
}

const initialState: AthleteState = {
  isLoading: true,
  athleteId: null,
  athleteResponse: null,
};

export const fetchClubAthleteData = createAsyncThunk("/club/athlete/fetchData", async ({ id, state }: any, { rejectWithValue }) => {
  try {
    const response = await axiosServices.get(`/club/athlete/${id}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const athleteSlice = createSlice({
  name: "clubathleteview",
  initialState,
  reducers: {
    setShooterId(state, action) {
      state.athleteId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubAthleteData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchClubAthleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.athleteResponse = action.payload;
      })
      .addCase(fetchClubAthleteData.rejected, (state) => {
        state.isLoading = false;
        state.athleteResponse = null;
      });
  },
});

export const { setShooterId } = athleteSlice.actions;
export default athleteSlice.reducer;
