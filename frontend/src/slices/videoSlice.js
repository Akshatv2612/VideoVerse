import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos: [],
    loading: false,
    error: null,
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setVideos, setLoading, setError } = videoSlice.actions;
export default videoSlice.reducer;