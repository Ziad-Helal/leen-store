import { configureStore } from "@reduxjs/toolkit";
import { generalSlice } from "./general/general-slice";
import { userSlice } from "./user/user-slice";
import { clientsSlice } from "./clients/clients-slice";
import { roundSlice } from "./round/round-slice";

export const store = configureStore({
    reducer: {
        general: generalSlice.reducer,
        user: userSlice.reducer,
        clients: clientsSlice.reducer,
        round: roundSlice.reducer,
    },
});
