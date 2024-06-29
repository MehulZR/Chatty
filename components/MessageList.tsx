"use client";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ReactElement, useEffect } from "react";
import { messagesSchema } from "@/lib/validations";
import { ADD_MESSAGES, Message, NO_MORE_MESSAGES } from "@/reducers/users";
import axios from "axios";
import { LoaderCircleIcon } from "lucide-react";

function Msg({
  message,
  isSender,
  time,
}: {
  message: string;
  isSender: boolean;
  time: Date;
}) {
  return (
    <div className={`w-fit ${isSender && "self-end"}`}>
      <div
        className={`bg-secondary rounded-b-lg text-sm lg:text-base p-2 lg:p-4 w-fit ${isSender ? "rounded-tl-lg" : "rounded-tr-lg"}`}
      >
        {message}
      </div>
      <p
        className={`text-[10px] lg:text-xs text-secondary ${isSender && "text-right"}`}
      >
        {time.toLocaleTimeString("en-US", {
          timeStyle: "short",
        })}
      </p>
    </div>
  );
}

function MessageSeparatorByDate({ date }: { date: Date }) {
  return (
    <div className="my-2 flex gap-2 justify-center items-center">
      <div className="flex-grow border-b border-b-primary"></div>
      <p className="text-[10px] lg:text-xs text-secondary">
        {date.toDateString()}
      </p>
      <div className="flex-grow border-b border-b-primary"></div>
    </div>
  );
}

export default function MessageList() {
  const currChatId = useAppSelector((state) => state.currentChatId);
  const myId = useAppSelector((state) => state.myInfo.id);

  const messages = useAppSelector((state) =>
    currChatId != null ? state.users[currChatId].messages : null,
  );

  const noMoreMessages = useAppSelector((state) =>
    currChatId != null ? state.users[currChatId].noMoreMessage : null,
  );

  const renderHelper: ReactElement[] = [];

  if (messages?.length) {
    for (let i = 0; i < messages.length; i++) {
      const {
        message,
        sender_id: senderId,
        created_at: createdAt,
      } = messages[i];
      const prevCreatedAt = messages[i - 1]?.created_at;

      const currTime = new Date(createdAt);
      const prevTime = i != 0 ? new Date(prevCreatedAt) : null;

      if (prevTime !== null && prevTime.getDate() != currTime.getDate()) {
        renderHelper.push(
          <MessageSeparatorByDate date={prevTime} key={`${i}-prev`} />,
        );
      }

      renderHelper.push(
        <Msg
          message={message}
          isSender={senderId === myId}
          time={currTime}
          key={i}
        />,
      );

      if (i === messages.length - 1) {
        renderHelper.push(
          <MessageSeparatorByDate date={currTime} key={`${i}-curr`} />,
        );
        if (!noMoreMessages)
          renderHelper.push(<LoadMoreMessages key={`${i}-more`} />);
      }
    }
  } else {
    renderHelper.push(<LoadMoreMessages key={"initial fetch"} />);
  }

  return (
    <div className="flex scroll-auto flex-grow overflow-y-scroll flex-col-reverse py-4 px-4 lg:px-8 gap-2 lg:gap-4">
      {renderHelper}
    </div>
  );
}

function LoadMoreMessages() {
  const [ref, entry] = useIntersectionObserver();
  const dispatch = useAppDispatch();

  const currChatId = useAppSelector((state) => state.currentChatId);
  const messages = useAppSelector((state) =>
    currChatId != null ? state.users[currChatId].messages : null,
  );
  const noMoreMessages = useAppSelector((state) =>
    currChatId != null ? state.users[currChatId].noMoreMessage : null,
  );

  useEffect(() => {
    if (entry?.isIntersecting && currChatId && noMoreMessages != null) {
      const abortController = new AbortController();
      void (async () => {
        const response = await fetchChat({
          currChatId,
          noMoreMessages,
          messages,
          abortSignal: abortController.signal,
        });

        if (!response) return;

        dispatch(ADD_MESSAGES({ id: currChatId, data: response }));
        if (response.length < 50) dispatch(NO_MORE_MESSAGES(currChatId));

        return () => {
          abortController.abort();
        };
      })();
    }
  }, [entry?.isIntersecting, currChatId, noMoreMessages, messages, dispatch]);

  return (
    <div ref={ref} className="w-min self-center">
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );
}

async function fetchChat({
  currChatId,
  noMoreMessages,
  messages,
  abortSignal,
}: {
  currChatId: string;
  noMoreMessages: boolean;
  messages: Message[] | null | undefined;
  abortSignal?: AbortSignal;
}) {
  if (noMoreMessages) return;
  const skip = messages?.length ?? 0;

  try {
    const response = await axios.get("/api/message", {
      withCredentials: true,
      params: { receiver_id: currChatId, skip },
      signal: abortSignal,
    });

    const parsedResponse = messagesSchema.safeParse(response.data);
    if (!parsedResponse.success) {
      throw new Error(parsedResponse.error.toString());
    }
    return parsedResponse.data;
  } catch (err) {
    if (axios.isCancel(err)) return;
    console.error(err);
  }
}
