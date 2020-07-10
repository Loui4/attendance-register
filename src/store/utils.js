import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "utils",
  initialState: {
    toast: null,
    addRequest: false,
  },

  reducers: {
    addRequestStarted: (utils, action) => {
      utils.addRequest = true;
    },
    addRequestCompleted: (utils, action) => {
      utils.addRequest = false;
    },
    showToast: (utils, action) => {
      utils.toast = action.payload;
    },
    hideToast: (utils, actions) => {
      utils.toast = {};
    },
  },
});

export const {
  addRequestCompleted,
  addRequestStarted,
  showToast,
  hideToast,
} = slice.actions;

export default slice.reducer;
