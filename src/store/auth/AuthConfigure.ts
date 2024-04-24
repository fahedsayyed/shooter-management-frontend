import { createSlice } from "@reduxjs/toolkit";

interface AuthType {
    isAuth: boolean;
}

const initialState: AuthType = {
    isAuth: false,
}

export const AuthConfigureSlice = createSlice({
    name: 'AuthConfig',
    initialState,
    reducers: {
        login: (state: AuthType, action) => ({
            ...state,
            isAuth: action.payload
        }),
        logout: (state: AuthType, action) => ({
            ...state,
            isAuth: action.payload
        })
    },
});

export const { login, logout } = AuthConfigureSlice.actions;
export default AuthConfigureSlice.reducer;