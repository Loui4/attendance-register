import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "residences",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    residenceRequest: (residences, action) => {
      residences.loading = true;
    },
    residenceReceived: (residences, action) => {
      residences.list = action.payload;
      residences.loading = false;
    },
    residenceAdded: (residences, action) => {
      residences.list.push(action.payload);
    },

    residenceRequestFailed: (residences, action) => {
      residences.loading = false;
    },
  },
});

const url = "/residences";

export default slice.reducer;
const {
  residenceReceived,
  residenceRequest,
  residenceRequestFailed,
} = slice.actions;

export const loadResidence = () =>
  apiCallBegan({
    onStart: residenceRequest.type,
    onSuccess: [residenceReceived.type],
    onError: residenceRequestFailed.type,
    url,
  });

export const getResidence = (residenceId) =>
  createSelector(
    (state) => state.entities.residences,
    (residences) =>
      residences.list.filter((residence) => residence.id === residenceId)[0]
  );
