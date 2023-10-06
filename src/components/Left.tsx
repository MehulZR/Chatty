import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SET_CURRENT_CHAT_ID } from "../reducers/currentChatId";
import { ADD_USERS } from "../reducers/users";
import MyInfo from "./MyInfo";
import SearchUser from "./SearchUser";
import UserList from "./UserList";
import axios from "axios";
interface User {
  id: string;
  name: string;
  picture: string;
}
interface UserListObject {
  [key: string | number]: User;
}
export default function Left() {
  const dispatch = useAppDispatch();
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [searchUserResult, setSearchUserResult] = useState<UserListObject>({});
  const [searchUserLoading, setSearchUserLoading] = useState(false);
  const users = useAppSelector((state) => state.users);

  // Search Users
  useEffect(() => {
    if (!searchUserQuery) {
      setSearchUserResult({});
      setSearchUserLoading(false);
    } else {
      if (!searchUserLoading) setSearchUserLoading(true);
      const fetch = async () => {
        try {
          const response = await axios.get("/api/users", {
            withCredentials: true,
            timeout: 2000,
            params: { query: searchUserQuery },
          });
          let tempSearchUsers: UserListObject = {};
          response.data.forEach((user: User) => {
            tempSearchUsers[user.id] = user;
          });
          setSearchUserResult(tempSearchUsers);
        } catch (err) {
          console.error(err);
        }
        setSearchUserLoading(false);
      };
      const timer = setTimeout(fetch, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchUserQuery]);

  function setCurrentChatHelper(id: string) {
    if (!users.hasOwnProperty(id)) {
      dispatch(ADD_USERS([searchUserResult[id]]));
    }
    dispatch(SET_CURRENT_CHAT_ID(id));
  }

  return (
    <div className="flex flex-col flex-none basis-80">
      <MyInfo />
      <div className="flex flex-col overflow-hidden grow">
        <SearchUser
          searchUserQuery={searchUserQuery}
          setSearchUserQuery={setSearchUserQuery}
          searchUserLoading={searchUserLoading}
        />
        <UserList
          users={searchUserQuery ? searchUserResult : users}
          setCurrentChatHelper={setCurrentChatHelper}
          searchUserLoading={searchUserLoading}
        />
      </div>
    </div>
  );
}
