"use client";
import { useAppSelector } from "@/hooks";
import MessageInput from "./messageInput";
import MessageList from "./messageList";
import OtherUserInfo from "./otherUserInfo";

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
