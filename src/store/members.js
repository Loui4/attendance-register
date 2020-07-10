import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";
import moment from "moment";
import { addRequestStarted, addRequestCompleted, showToast } from "./utils";

const slice = createSlice({
  name: "members",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    membersRequested: (members, action) => {
      members.loading = true;
    },

    membersRequestFailed: (members, action) => {
      members.loading = false;
    },
    membersReceived: (members, action) => {
      members.list = action.payload;
      members.loading = false;
      members.lastFetch = Date.now();
    },
    memberDeleted: (members, action) => {
      const index = members.list.findIndex(
        (member) => member.id === action.payload
      );
      members.list.splice(index, 1);
    },
    memberAdded: (members, action) => {
      members.list.push(action.payload);
    },
    memberEdited: (members, action) => {
      const index = members.list.findIndex((member) => member.id === action.id);
      members[index] = action.member;
    },
  },
});

export default slice.reducer;
const {
  memberAdded,
  // memberEdited,
  membersReceived,
  membersRequested,
  membersRequestFailed,
  memberDeleted,
} = slice.actions;

const url = "/members";

export const loadMembers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.members;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: membersRequested.type,
      onSuccess: [membersReceived.type],
      onError: membersRequestFailed.type,
    })
  );
};

export const addMember = (member) =>
  apiCallBegan({
    url,
    method: "post",
    onStart: addRequestStarted.type,
    data: member,
    toast: showToast.type,
    onSuccess: [memberAdded.type, addRequestCompleted.type],
  });

export const deleteMember = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "delete",
    data: id,
    onSuccess: memberDeleted.type,
  });
