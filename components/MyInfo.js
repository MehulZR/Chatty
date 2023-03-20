import Image from "next/image";
import Link from "next/link";
import logoutImage from "../public/logout.svg";
export default function MyInfo({ myImage, myName }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <Image
          src={myImage}
          height={40}
          width={40}
          className="w-10 h-10 rounded-full"
          alt="my_image"
        ></Image>
        <span className="ml-2 text-lg ">{myName}</span>
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
