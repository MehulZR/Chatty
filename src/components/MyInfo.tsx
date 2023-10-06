import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "../hooks";
import logoutImage from "../../public/logout.svg";
import userImage from "../../public/user.svg";

export default function MyInfo() {
  const name = useAppSelector((state) => state.myInfo.name);
  const pictureURL = useAppSelector((state) => state.myInfo.picture);
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <Image
          src={pictureURL || userImage}
          height={40}
          width={40}
          className="w-10 h-10 rounded-full"
          alt="my_image"
        ></Image>
        <span className="ml-2 text-lg ">{name}</span>
      </div>
      <Link
        className="w-10 h-10 p-2 overflow-hidden rounded-full hover:bg-neutral-800"
        href="/api/logout"
      >
        <Image
          src={logoutImage}
          className="w-6 h-6 m-auto"
          alt="logout"
        ></Image>
      </Link>
    </div>
  );
}
