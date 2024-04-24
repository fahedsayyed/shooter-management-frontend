import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    timer: null,
    role: ''
}

const AuthToken = createSlice({
    name: 'AuthToken',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const { token, role, time } = action.payload;

            return {
                ...state,
                token: token,
                role: role,
                timer: time
            };
        },

        clearToken: (state) => ({
            ...state,
            token: null,
            role: '',
            timer: null,
        })
    }
});

export const { setToken, clearToken } = AuthToken.actions;
export const selectToken = (state: any) => state.AuthToken?.token;
export const selectTokenExpiry = (state: any) => state.AuthToken?.tokenExpiry;

export default AuthToken.reducer;