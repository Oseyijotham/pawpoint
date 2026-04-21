import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  updateAvatar,
  getUser,
  setSortAll,
  setSortPending,
  setSortFulfilled,
  setSortPastDue,
  setScheduler,
  clearData,
} from './operations';

const initialState = {
  user: { firstname: null, lastname: null, email:null, phone:null, avatarURL:null, groups:null },
  token: null,
  isLoggedIn: false,
  isRegistered: false,
  isRefreshing: false,
  all: false,
  pending: false,
  fulfilled: false,
  pastDue: false,
  scheduler: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(clearData.fulfilled, (state, action) => { 
        
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        //state.token = action.payload.token;
        state.isRegistered = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.avatarURL = action.payload.avatarURL;
        //state.token = action.payload.token;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        //state.isRegistered = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = {
          firstname: null,
          lastname: null,
          email: null,
          phone: null,
          avatarURL: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isRegistered = false;
      })
      .addCase(logOut.rejected, state => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(setSortAll.fulfilled, (state, action) => {
        state.all = action.payload;
        state.pending = false;
        state.fulfilled = false;
        state.pastDue = false;
        state.scheduler = false;
      })
      .addCase(setSortPending.fulfilled, (state, action) => {
        state.all = false;
        state.pending = action.payload;
        state.fulfilled = false;
        state.pastDue = false;
        state.scheduler = false;
      })
      .addCase(setSortFulfilled.fulfilled, (state, action) => {
        state.all = false;
        state.pending = false;
        state.fulfilled = action.payload;
        state.pastDue = false;
        state.scheduler = false;
      })
      .addCase(setSortPastDue.fulfilled, (state, action) => {
        state.all = false;
        state.pending = false;
        state.fulfilled = false;
        state.pastDue = action.payload;
        state.scheduler = false;
      })
      .addCase(setScheduler.fulfilled, (state, action) => {
        state.all = false;
        state.pending = false;
        state.fulfilled = false;
        state.pastDue = false;
        state.scheduler = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
