import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    error: null,
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
});

export const { setComments, setError, setLoading } = commentSlice.actions;
export default commentSlice.reducer;