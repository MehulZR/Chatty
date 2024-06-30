"use client";
import { useAppSelector } from "@/hooks";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import OtherUserInfo from "./OtherUserInfo";

export default function RightSection() {
  const currChatId = useAppSelector((state) => state.currentChatId);

  if (currChatId === null) {
    return <div className="hidden lg:block w-full bg-secondary"></div>;
  }

  return (
    <div className="w-full flex flex-col">
      <OtherUserInfo />
      <MessageList />
      <MessageInput />
    </div>
  );
}
