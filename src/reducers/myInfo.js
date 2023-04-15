import { createSlice } from "@reduxjs/toolkit";

const myInfoSlice = createSlice({
  name: "myInfo",
  initialState: {
    name: "",
    id: "",
    picture: "",
  },
  reducers: {
    SET_INFO: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.picture = action.payload.picture;
    },
  },
});

export const { SET_INFO } = myInfoSlice.actions;
export default myInfoSlice.reducer;
