import { createSlice } from "@reduxjs/toolkit";

const currentChatIdSlice = createSlice({
  name: "currentChatId",
  initialState: null,
  reducers: {
    SET_CURRENT_CHAT_ID: (state, action) => {
      return action.payload;
    },
  },
});

export const { SET_CURRENT_CHAT_ID } = currentChatIdSlice.actions;
export default currentChatIdSlice.reducer;
