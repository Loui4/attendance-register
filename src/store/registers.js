import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { showToast } from "./utils";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "registrations",
  initialState: {
    list: [],
    loading: false,
    addingRegistration: false,
  },

  reducers: {
    addRegistrationRequest: (registrations, action) => {
      registrations.addingRegistration = true;
    },
    addRegistrationRequestCompleted: (registrations, action) => {
      registrations.addingRegistration = false;
    },
    registersRequested: (registrations, actions) => {
      registrations.loading = true;
    },
    registersRequestedFailed: (registrations, actions) => {
      registrations.loading = true;
    },
    registrationsReceived: (registrations, actions) => {
      registrations.list = actions.payload;
      registrations.loading = false;
    },
    registrationAdded: (registrations, action) => {
      registrations.list.push(action.payload);
    },

    registrationDelete: (registrations, action) => {
      const index = registrations.list.findIndex(
        (registration) => registration.id === action.payload
      );
      registrations.list.splice(index, 1);
    },
  },
});

const {
  registersRequested,
  registrationAdded,
  registrationsReceived,
  registersRequestedFailed,
  registrationDelete,
  addRegistrationRequest,
  addRegistrationRequestCompleted,
} = slice.actions;

export default slice.reducer;

const url = "/attendances";
export const loadRegistrations = () => {
  return apiCallBegan({
    url,
    onStart: registersRequested.type,
    onSuccess: [registrationsReceived.type],
    onError: registersRequestedFailed.type,
  });
};

export const addRegistration = (registration) => {
  return apiCallBegan({
    url,
    onStart: addRegistrationRequest.type,
    method: "post",
    data: registration,
    toast: showToast.type,
    onSuccess: [registrationAdded.type, addRegistrationRequestCompleted.type],
  });
};

export const checkRegistration = (memberId, serviceId) =>
  createSelector(
    (state) => state.entities.registrations,
    (registrations) =>
      registrations.list.find(
        (registration) =>
          registration.member === memberId && registration.service === serviceId
      )
  );

export const deleteRegistration = (registrationId) =>
  apiCallBegan({
    url: url + "/" + registrationId,
    onStart: addRegistrationRequest.type,
    method: "delete",
    data: registrationId,
    toast: showToast.type,
    onSuccess: [registrationDelete.type, addRegistrationRequestCompleted.type],
  });
