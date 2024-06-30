"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { usersSchema } from "@/lib/validations";
import { ADD_USERS, User } from "@/reducers/users";
import { SET_CURRENT_CHAT_ID } from "@/reducers/currentChatId";
import FeatherIcon from "feather-icons-react";
import { Input } from "./ui/input";
import { LucideLoaderCircle, LucideSearch, LucideX } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function UserList() {
  const currChatId = useAppSelector((state) => state.currentChatId);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Record<string, User>>({});
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  //Get Users
  useEffect(() => {
    void (async () => {
      try {
        const response = await axios.get("/api/users", {
          withCredentials: true,
        });

        const parsedResponse = usersSchema.safeParse(response.data);
        if (!parsedResponse.success) {
          throw new Error(parsedResponse.error.toString());
        }
        dispatch(ADD_USERS(parsedResponse.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  // Search User
  useEffect(() => {
    if (!searchQuery) {
      setSearchResult({});
      setSearchIsLoading(false);
    } else {
      setSearchIsLoading(true);
      const fetch = async () => {
        try {
          const response = await axios.get("/api/users", {
            withCredentials: true,
            timeout: 2000,
            params: { query: searchQuery },
          });
          const parsedResponse = usersSchema.safeParse(response.data);
          if (!parsedResponse.success) {
            throw new Error(parsedResponse.error.toString());
          }
          const tempSearchUsers: Record<string, User> = {};
          parsedResponse.data.forEach((user) => {
            tempSearchUsers[user.id] = {
              ...user,
              messages: [],
              noMoreMessage: false,
            };
          });
          setSearchResult(tempSearchUsers);
        } catch (err) {
          console.error(err);
        } finally {
          setSearchIsLoading(false);
        }
      };
      const timer = setTimeout(() => void fetch(), 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  function setCurrChatHelper(id: string) {
    if (!Object.hasOwn(users, id)) dispatch(ADD_USERS([searchResult[id]]));
    dispatch(SET_CURRENT_CHAT_ID(id));
  }

  const renderHelper = Object.values(
    searchQuery.length ? searchResult : users,
  ).map((user) => {
    return (
      <div
        className={`flex rounded hover:bg-secondary gap-2 p-2 justify-start items-center ${currChatId === user.id ? "bg-secondary" : ""}`}
        key={user.id}
        onClick={() => setCurrChatHelper(user.id)}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.picture}></AvatarImage>
          <AvatarFallback>
            <FeatherIcon icon="user" className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm md:text-base">{user.name}</p>
      </div>
    );
  });

  return (
    <>
      <SearchUser
        searchIsLoading={searchIsLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex px-4 flex-col gap-2 flex-grow overflow-y-scroll">
        {renderHelper}
      </div>
    </>
  );
}

function SearchUser({
  searchQuery,
  setSearchQuery,
  searchIsLoading,
}: {
  searchQuery: string;
  searchIsLoading: boolean;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="md:h-32 flex-shrink-0 px-4 mb-2 md:mb-4">
      <p
        className={
          plusJakartaSans.className +
          " font-semibold text-2xl md:text-4xl mt-4 mb-3 md:mt-6 md:mb-5"
        }
      >
        Chats
      </p>
      <div className="flex justify-center z-10 items-center relative">
        <Input
          className="bg-secondary border pl-4 pr-12 py-2 border-secondary text-base placeholder-secondary"
          placeholder="Search Username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-4">
          {searchQuery ? (
            searchIsLoading ? (
              <LucideLoaderCircle className="animate-spin w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <LucideX
                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                onClick={() => void setSearchQuery("")}
              />
            )
          ) : (
            <LucideSearch className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </div>
      </div>
    </div>
  );
}
