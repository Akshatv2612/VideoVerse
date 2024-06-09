import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user:null,
    error: null,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const { login, logout, setError,setLoading} = authSlice.actions;
export default authSlice.reducer;