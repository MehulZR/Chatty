import chatImage from "../public/chating.svg";
import Image from "next/image";
export default function ChatImage() {
  return (
    <div className="flex flex-col items-center justify-center basis-96 shrink-0 bg-neutral-800 grow">
      <div className="max-w-md p-5">
        <Image
          src={chatImage}
          alt="Chat Image"
          className="w-full"
          priority={true}
        />
        <p className="mt-4 text-sm text-neutral-400">Welcome to the party!</p>
        <p className="mt-2 text-3xl font-semibold">
          Let's start meeting someone <span className="text-sky-700">New</span>
        </p>
        <p className="mt-2 text-sm text-neutral-400">
          Don't be shy, Click on any User from the list. Have fun!
        </p>
      </div>
    </div>
  );
}
