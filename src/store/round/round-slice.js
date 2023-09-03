import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    round: {},
};

export const roundSlice = createSlice({
    name: "round",
    initialState,
    reducers: {},
});

export const roundActions = roundSlice.actions;
