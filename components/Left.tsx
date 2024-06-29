"use client";
import { useAppSelector } from "@/hooks";
import MyInfo from "./MyInfo";
import UserList from "./UserList";

export default function LeftSection() {
  const currChatId = useAppSelector((state) => state.currentChatId);
  return (
    <div
      className={`flex-grow lg:flex-grow-0 lg:min-w-[432px] border-r-primary border-r lg:flex flex-col ${currChatId ? "hidden" : "flex"}`}
    >
      <MyInfo />
      <UserList />
    </div>
  );
}
