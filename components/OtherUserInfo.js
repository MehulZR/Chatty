import Image from "next/image";
export default function OtherUserInfo({
  otherUserImage,
  otherUserName,
  onlineStatus = false,
}) {
  return (
    <div className="flex items-center px-4 py-3">
      <Image
        src={otherUserImage}
        className="w-10 h-10 overflow-hidden rounded-full"
        alt="user_image"
        width={40}
        height={40}
      ></Image>
      <div className="flex flex-col justify-center ml-2 ">
        <p className={onlineStatus ? "" : "text-lg"}>{otherUserName}</p>
        {onlineStatus ? <p className="text-xs">Online</p> : ""}
      </div>
    </div>
  );
}
