import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("api/fetchPosts", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
});

const apiSlice = createSlice({
    name: "api",
    initialState: {
        posts: [],
        status: "idle",
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default apiSlice.reducer;
