"use client";
import FeatherIcon from "feather-icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "./ui/button";
import { SET_CURRENT_CHAT_ID } from "@/reducers/currentChatId";

export default function OtherUserInfo() {
  const dispatch = useAppDispatch();
  const currChatId = useAppSelector((state) => state.currentChatId);
  const currChatUserName = useAppSelector((state) =>
    currChatId ? state.users[currChatId].name : null,
  );
  const currChatUserPicURL = useAppSelector((state) =>
    currChatId ? state.users[currChatId].picture : "",
  );
  const isOnline = useAppSelector((state) =>
    currChatId ? state.onlineUsers[currChatId] : false,
  );
  return (
    <div className="pr-4 lg:pl-4 h-14 md:h-20 border-b border-b-primary flex-shrink-0 flex gap-1 justify-start items-center">
      <Button
        size="icon"
        className="lg:hidden ml-1 bg-primary rounded-full"
        onClick={() => void dispatch(SET_CURRENT_CHAT_ID(null))}
      >
        <FeatherIcon icon="arrow-left" />
      </Button>
      <div className="flex justify-start items-center gap-2">
        <Avatar className="h-8 w-8 md:w-10 md:h-10">
          <AvatarImage src={currChatUserPicURL}></AvatarImage>
          <AvatarFallback>
            <FeatherIcon icon="user" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center items-start">
          <p className="font-medium md:font-normal text-base md:text-xl">
            {currChatUserName}
          </p>
          <p className="text-green font-medium md:font-semibold text-[10px] md:text-sm">
            {isOnline && "Online"}
          </p>
        </div>
      </div>
    </div>
  );
}
