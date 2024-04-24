import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    error: null,
    allStateUnits: [],
    allStates: [],
    allCities: [],
    stateCities: [],
    allTypeEvents: [],
    allMembershipPlans: [],
    allSubTypes: [],
    allMembershipPlansWithType: [],
    allMembershipSubTypesAllClubs: []
};

export const fetchMembershipSubTypesAllClubs = createAsyncThunk(
    'athlete/fetchMembershipSubTypesAllClubs',
    async (district: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/membership-subTypesAllClubs/${district}`);

            return {
                allMembershipSubTypesAllClubs: response.data,
            };
        } catch (error: any) {

            return rejectWithValue(error.message);
        }
    }
);

export const fetchStateUnits = createAsyncThunk('athlete/fetchStateUnits', async (tokenstate: any, { rejectWithValue }) => {
    try {
        // Slide one --
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/state-units`);

        return {
            allStateUnits: response.data,
        };
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchStatesAndCities = createAsyncThunk('athlete/fetchStatesAndCities', async (_, { rejectWithValue }) => {
    try {
        // Slide second --
        const resStates = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/states`);
        const resCities = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/cities`);

        return {
            allStates: resStates.data,
            allCities: resCities.data,
        };
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const fetchStateCitiesById = createAsyncThunk(
    'athlete/fetchStateCitiesById',
    async (stateId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/state-city?stateId=${stateId}`);

            return {
                stateCities: response.data,
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchEvents = createAsyncThunk('athlete/fetchEvents', async (_, { rejectWithValue }) => {
    try {
        const resEvents = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/event-types`);
        const resMembershipPlans = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/membership-plans`);

        return {
            allTypeEvents: resEvents.data,
            allMembershipPlans: resMembershipPlans.data
        };
    } catch (error: any) {

        return rejectWithValue(error.message);
    }
});

export const fetchMembershipPlansWithType = createAsyncThunk(
    'athlete/fetchMembershipPlansWithType',
    async (defineType: any, { rejectWithValue }) => {
        try {
            const resAllMembershipPlansWithType = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/membership-types/${defineType}`);
            const resAllMembershipSubType = await axios.get(`${process.env.REACT_APP_BASE_URL}/util/membership-subTypes/${defineType}`);

            return {
                allSubTypes: resAllMembershipSubType.data,
                allMembershipPlansWithType: resAllMembershipPlansWithType.data,
            };
        } catch (error: any) {

            return rejectWithValue(error.message);
        }
    }
);

const utilFormSlice = createSlice({
    name: 'athleteCommonData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatesAndCities.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStatesAndCities.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchStatesAndCities.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStateCitiesById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStateCitiesById.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchStateCitiesById.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStateUnits.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStateUnits.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchStateUnits.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMembershipSubTypesAllClubs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMembershipSubTypesAllClubs.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchMembershipSubTypesAllClubs.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEvents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchEvents.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMembershipPlansWithType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMembershipPlansWithType.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(fetchMembershipPlansWithType.rejected, (state) => {
                state.isLoading = true;
            });
    },
});

export default utilFormSlice.reducer;