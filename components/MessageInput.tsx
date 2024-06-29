"use client";
import FeatherIcon from "feather-icons-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import axios from "axios";
import { messageSchema } from "@/lib/validations";
import { ADD_NEW_MESSAGE } from "@/reducers/users";

export default function MessageInput() {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const currentChatId = useAppSelector((state) => state.currentChatId);

  const sendMessage = async () => {
    if (!message) return;
    try {
      if (currentChatId === null)
        throw new Error("Current Chat Id is null, can't store message");

      const response = await axios.post(
        "/api/message",
        {
          receiver_id: currentChatId,
          message,
        },
        { withCredentials: true },
      );
      const parsedResponse = messageSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error.toString());
      }
      dispatch(
        ADD_NEW_MESSAGE({
          id: currentChatId,
          data: parsedResponse.data,
        }),
      );
    } catch (err) {
      console.error(err);
    }
    setMessage("");
  };

  return (
    <div className="flex justify-center items-center flex-shrink-0 gap-2 px-4 py-2 lg:py-4 border-t border-t-primary">
      <Input
        className="bg-secondary border px-4 py-2 border-secondary text-base placeholder-secondary"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") void sendMessage();
        }}
      />
      <Button
        size="icon"
        className="lg:w-9 lg:h-9 h-10 w-10 p-px bg-black rounded-3xl flex-shrink-0 text-white flex justify-center items-center"
        onClick={() => void sendMessage()}
      >
        <FeatherIcon icon="send" className="-translate-x-[2px] w-6 h-6" />
      </Button>
    </div>
  );
}
