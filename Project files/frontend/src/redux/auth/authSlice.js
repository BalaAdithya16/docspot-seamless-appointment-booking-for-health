// Redux Toolkit Imports
import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  const localStorageItem = localStorage.getItem("user");
  if (localStorageItem) {
    return JSON.parse(localStorageItem);
  } else {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUser(),
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectedUserId = (state) =>
  state.auth?.user?.data?.user?._id;

export const selectedUserName = (state) =>
  state.auth?.user?.data?.user?.name;

export const selectedUserPhoneNumber = (state) =>
  state.auth?.user?.data?.user?.phoneNumber;

export const selectedUserEmail = (state) =>
  state.auth?.user?.data?.user?.email;

export const selectedUserNotifications = (state) =>
  state.auth?.user?.data?.user?.unseenNotifications;

export const selectedUserReadNotifications = (state) =>
  state.auth?.user?.data?.user?.seenNotifications;

export const userIsAdmin = (state) =>
  state.auth?.user?.data?.user?.isAdmin;

export const userIsDoctor = (state) =>
  state.auth?.user?.data?.user?.isDoctor;
