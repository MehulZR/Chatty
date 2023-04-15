import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import OtherUserInfo from "./OtherUserInfo";
export default function Right() {
  return (
    <div className="flex flex-col grow">
      <OtherUserInfo />
      <MessageList />
      <MessageInput />
    </div>
  );
}
