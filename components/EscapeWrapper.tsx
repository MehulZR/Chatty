import { useAppDispatch } from "@/hooks";
import { SET_CURRENT_CHAT_ID } from "@/reducers/currentChatId";

export default function EscapeWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();

  return (
    <div
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") dispatch(SET_CURRENT_CHAT_ID(null));
      }}
    >
      {children}
    </div>
  );
}
