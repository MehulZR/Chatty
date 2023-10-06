import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface OnlineUsersInitialState {
  [key: string | number]: boolean;
}
const initialState: OnlineUsersInitialState = {};

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    SET_USERS_ONLINE: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((userId) => {
        state[userId] = true;
      });
    },
    SET_USERS_OFFLINE: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((userId) => {
        state[userId] = false;
      });
    },
  },
});

export const { SET_USERS_OFFLINE, SET_USERS_ONLINE } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;
