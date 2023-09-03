import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: {
    mainNavIsOpen: false,
    clientsOptionsIsOpen: false,
    clientsFilterIsOpen: false,
    roundFiltersIsOpen: false,
    roundAreaFilterIsOpen: false,
  },
  loading: {
    user: false,
    users: false,
    clients: false,
    formSubmition: false,
  },
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    showList(state, action) {
      const list = action.payload;

      switch (list) {
        case "MainNav":
          state.lists.mainNavIsOpen = true;
          state.lists.clientsOptionsIsOpen = false;
          state.lists.clientsFilterIsOpen = false;
          state.lists.roundFiltersIsOpen = false;
          state.lists.roundAreaFilterIsOpen = false;
          break;

        case "clientsOptions":
          state.lists.clientsOptionsIsOpen = true;
          state.lists.clientsFilterIsOpen = false;
          state.lists.mainNavIsOpen = false;
          break;

        case "clientsFilter":
          state.lists.clientsFilterIsOpen = true;
          state.lists.clientsOptionsIsOpen = false;
          state.lists.mainNavIsOpen = false;
          break;

        case "roundFilters":
          state.lists.roundFiltersIsOpen = true;
          state.lists.roundAreaFilterIsOpen = false;
          state.lists.mainNavIsOpen = false;
          break;

        case "roundAreaFilter":
          state.lists.roundAreaFilterIsOpen = true;
          state.lists.roundFiltersIsOpen = false;
          state.lists.mainNavIsOpen = false;
          break;

        default:
          console.log("wrong list name");
          break;
      }
    },
    hideList(state, action) {
      const list = action.payload;

      switch (list) {
        case "MainNav":
          state.lists.mainNavIsOpen = false;
          break;

        case "clientsOptions":
          state.lists.clientsOptionsIsOpen = false;
          break;

        case "clientsFilter":
          state.lists.clientsFilterIsOpen = false;

        case "roundFilters":
          state.lists.roundFiltersIsOpen = false;
          break;

        case "roundAreaFilter":
          state.lists.roundAreaFilterIsOpen = false;
          break;

        default:
          console.log("wrong list name");
      }
    },
    loading(state, action) {
      const load = action.payload;

      switch (load) {
        case "user":
          state.loading.user = true;
          break;
        case "users":
          state.loading.users = true;
          break;
        case "clients":
          state.loading.clients = true;
          break;
        case "formSubmition":
          state.loading.formSubmition = true;
          break;

        default:
          break;
      }
    },
    loaded(state, action) {
      const load = action.payload;

      switch (load) {
        case "user":
          state.loading.user = false;
          break;
        case "users":
          state.loading.users = false;
          break;
        case "clients":
          state.loading.clients = false;
          break;
        case "formSubmition":
          state.loading.formSubmition = false;
          break;

        default:
          break;
      }
    },
  },
});

export const generalActions = generalSlice.actions;
