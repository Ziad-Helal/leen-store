import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {},
    allUsers: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = {
                email: action.payload.email,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                userRole: action.payload.userRole,
            };
        },
        clearCurrentUser(state) {
            state.currentUser = { userRole: "مستخدم بدون حساب" };
        },
        setAllUsers(state, action) {
            state.allUsers = action.payload;
        },
    },
});

export const userActions = userSlice.actions;
