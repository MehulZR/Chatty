import { configureStore } from "@reduxjs/toolkit";
import myInfo from "./reducers/myInfo";
import currentChatId from "./reducers/currentChatId";
import users from "./reducers/users";
import onlineUsers from "./reducers/onlineUsers";
export default configureStore({
  reducer: {
    myInfo,
    currentChatId,
    users,
    onlineUsers,
  },
});
