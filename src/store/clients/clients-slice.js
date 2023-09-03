import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: {},
  geoClients: {},
  region: "الكل",
  starredClients: {},
  filteredClients: [],
  toBeFilterd: {},
  clientsPerPage: 10,
  currentPageNumber: 1,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients(state, action) {
      Object.keys(action.payload).forEach((ClientName) => {
        const client = action.payload[ClientName];
        state.clients[ClientName] = client;

        const region = !!client.المنطقة.trim()
          ? client.المنطقة.trim()
          : "غير محدد";
        if (state.geoClients[region] === undefined)
          state.geoClients[region] = {};
        state.geoClients[region][ClientName] = client;

        if (state.region === "الكل" && region != "غير محدد")
          state.filteredClients.push({ الاسم: ClientName, ...client });
      });
      state.toBeFilterd = state.clients;
    },
    addStarredClient(state, action) {
      state.starredClients[action.payload["الاسم"]] =
        action.payload.starredClient;

      localStorage.setItem(
        "starredClientsNames",
        Object.keys(state.starredClients)
      );
    },
    updateStarredClients(state, action) {
      if (state.starredClients[action.payload["الاسم"]] === undefined) {
        state.starredClients[action.payload["الاسم"]] = action.payload;
        delete state.starredClients[action.payload["الاسم"]]["الاسم"];
      } else delete state.starredClients[action.payload["الاسم"]];

      localStorage.setItem(
        "starredClientsNames",
        Object.keys(state.starredClients)
      );
    },
    filterClients(state, action = { payload: { filterBy, searchQuery } }) {
      const { filterBy, searchQuery } = action.payload;
      const result = [];

      if (filterBy === "الاسم")
        Object.keys(state.toBeFilterd).forEach((الاسم) => {
          if (الاسم.includes(searchQuery))
            result.push({ الاسم, ...state.toBeFilterd[الاسم] });
        });

      state.filteredClients = result;
    },
    clearClients(state) {
      state.clients = [];
      state.filteredClients = [];
      state.toBeFilterd = [];
    },
    updateRegion(state, action) {
      state.filteredClients = [];

      if (state.region === action.payload) {
        state.region = "الكل";
        state.toBeFilterd = state.clients;
      } else {
        state.region = action.payload;
        state.toBeFilterd = state.geoClients[state.region];
      }

      Object.keys(state.toBeFilterd).forEach((clientName) => {
        if (
          state.region != "الكل" ||
          state.toBeFilterd[clientName].المنطقة.trim() != ""
        )
          state.filteredClients.push({
            الاسم: clientName,
            ...state.toBeFilterd[clientName],
          });
      });
    },
    nextPage(state) {
      state.currentPageNumber++;
    },
    prevPage(state) {
      state.currentPageNumber--;
    },
    setPageNumber(state, action) {
      state.currentPageNumber = action.payload;
    },
    setClientsPerPage(state, action) {
      state.clientsPerPage = action.payload;
    },
  },
});

export const clientsActions = clientsSlice.actions;
