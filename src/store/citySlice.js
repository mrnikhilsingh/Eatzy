import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: "gurgaon",
  reducers: {
    setCityName: (state, action) => action.payload,
  },
});

export const { setCityName } = citySlice.actions;
export default citySlice.reducer;
