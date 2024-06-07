import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface MyInfo {
  name: string;
  id: string;
  picture: string;
}
const initialState: MyInfo = {
  name: "",
  id: "",
  picture: "",
};

const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {
    SET_INFO: (state, action: PayloadAction<MyInfo>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.picture = action.payload.picture;
    },
  },
});

export const { SET_INFO } = myInfoSlice.actions;
export default myInfoSlice.reducer;
