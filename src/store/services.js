import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { addRequestStarted, addRequestCompleted } from "./utils";

const slice = createSlice({
  name: "services",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    servicesRequest: (services, action) => {
      services.loading = true;
    },
    servicesRequestFailed: (services, action) => {
      services.loading = false;
    },

    serviceAdded: (services, action) => {
      services.list.push(action.payload);
    },

    servicesReceived: (services, action) => {
      services.list = action.payload;
      services.loading = false;
    },
  },
});

const {
  servicesReceived,
  servicesRequest,
  servicesRequestFailed,
  serviceAdded,
} = slice.actions;

export default slice.reducer;

const url = "/services";

export const loadServices = () =>
  apiCallBegan({
    url,
    onStart: servicesRequest.type,
    onSuccess: [servicesReceived.type],
    onError: servicesRequestFailed.type,
  });

export const addService = (service) =>
  apiCallBegan({
    url,
    onStart: addRequestStarted.type,
    method: "post",
    data: service,
    onSuccess: [serviceAdded.type, addRequestCompleted.type],
  });
