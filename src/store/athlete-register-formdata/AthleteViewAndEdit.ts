import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyMessage } from "src/utils/toastNotify";
import axiosServices from "src/utils/axios";
import axios from "axios";
import APP_ROUTES from "src/routes/routePaths";

interface AthleteState {
  isLoading: boolean;
  athleteId: string | null;
  athleteResponse: any;
}

const initialState: AthleteState = {
  isLoading: true,
  athleteId: null,
  athleteResponse: [],
};

export const fetchAthleteData = createAsyncThunk("athlete/fetchData", async ({ id, state }: any, { rejectWithValue }) => {
  try {
    const response = await axiosServices.get(`/athlete/${id}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const updateAthleteData = createAsyncThunk("athlete/updateData", async ({ id, formData, token, navigate }: any, { rejectWithValue }) => {
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1], "fronm rdsdssds");
  }

  console.log(id, formData, 'update from redux response --');

  try {
    // const response = await axiosServices.put(`/athlete/update-athlete/${id}`, formData );
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/athlete/update-athlete/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

    console.log(response.data, "from update redux --");

    if (response.status === 200) {
      navigate(`${APP_ROUTES.ATHLETE_ONLY}`);

    } else {

      return;
    }

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {

      return rejectWithValue(error.response.data);
    } else {
      navigate(`${APP_ROUTES.ATHLETE_ONLY}`);

      return rejectWithValue({ error: "An error occurred. Please try again." });
    }
  }
});

export const createAthleteData = createAsyncThunk("athlete/createData", async ({ formData, navigate }: any, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/athlete/athlete-register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      notifyMessage.success("Registered successfully");

      navigate("/auth/login");
    }

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {

      return rejectWithValue(error.response.data);
    } else {
      navigate("/auth/login");

      return rejectWithValue({ error: "An error occurred. Please try again." });
    }
  }
});

const athleteSlice = createSlice({
  name: "athleteview",
  initialState,
  reducers: {
    setShooterId(state, action) {
      state.athleteId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAthleteData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAthleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.athleteResponse = action.payload;
      })
      .addCase(fetchAthleteData.rejected, (state) => {
        state.isLoading = false;
        state.athleteResponse = null;
      })
      .addCase(updateAthleteData.pending, (state) => {
      })
      .addCase(updateAthleteData.fulfilled, (state, action) => {
        state.athleteResponse = action.payload;
        notifyMessage.success("Updated successfully");
      })
      .addCase(updateAthleteData.rejected, (state, action) => {
        notifyMessage.error('Update failed: ' + action.payload);
      })
      .addCase(createAthleteData.pending, (state) => {
      })
      .addCase(createAthleteData.fulfilled, (state, action) => {
        state.athleteResponse = action.payload;
        // notifyMessage.success("Registered successfully");
      })
      .addCase(createAthleteData.rejected, (state, action) => {
        // notifyMessage.error('Registration failed: ' + action.payload);
      });
  },
});

export const { setShooterId } = athleteSlice.actions;
export default athleteSlice.reducer;
