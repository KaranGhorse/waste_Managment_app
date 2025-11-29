import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,        // name, email, id, etc
  reports: [],       // user related reports
  coins: null,       // wallet / in-app currency
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.reports = [];
      state.coins = null;
    },

    setReports: (state, action) => {
      state.reports = action.payload;
    },

    addReport: (state, action) => {
      state.reports.push(action.payload);
    },

    setCoins: (state, action) => {
      state.coins = action.payload;
    },
  },
});

export const { setUser, clearUser, setReports, addReport, setCoins } = userSlice.actions;
export default userSlice.reducer;
