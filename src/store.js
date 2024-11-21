import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./store/counterSlice";
import apiReducer from "./store/apiSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        api: apiReducer,
    },
});

export default store;
