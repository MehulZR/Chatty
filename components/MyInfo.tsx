import logoutImage from "@/public/logout.webp";
import Image from "next/image";
import { useAppSelector } from "../hooks";
import userImage from "@/public/user.webp";
import { useRouter } from "next/navigation";
export default function MyInfo() {
  const name = useAppSelector((state) => state.myInfo.name);
  const pictureURL = useAppSelector((state) => state.myInfo.picture);
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

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
      <button
        className="w-10 h-10 p-2 overflow-hidden rounded-full hover:bg-neutral-800"
        onClick={() => void logout()}
      >
        <Image
          src={logoutImage}
          className="w-6 h-6 m-auto"
          alt="logout"
        ></Image>
      </button>
    </div>
  );
}
