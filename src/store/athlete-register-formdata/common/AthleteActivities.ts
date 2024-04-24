import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   checkError: false
}

const AthleteActivities = createSlice({
    name: 'check for message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            return {
                ...state,
              checkError: action.payload,
            };
        },
    }
});

export const { setMessage } = AthleteActivities.actions;
export default AthleteActivities.reducer;