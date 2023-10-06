import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
const currentChatIdSlice = createSlice({
  name: "currentChatId",
  initialState: null as string | null,
  reducers: {
    SET_CURRENT_CHAT_ID: (state, action: PayloadAction<string | null>) => {
      return action.payload;
    },
  },
});

export const { SET_CURRENT_CHAT_ID } = currentChatIdSlice.actions;
export default currentChatIdSlice.reducer;
