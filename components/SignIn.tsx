import googleIcon from "@/public/google-icon.webp";
import Link from "next/link";
import Image from "next/image";
import chatImage from "@/public/chating.webp";
export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen p-2 text-neutral-100 bg-neutral-900">
      <div className="max-w-md p-5 rounded-lg bg-neutral-800">
        <Image src={chatImage} alt="Chat Image" className="w-full" />
        <p className="mt-4 text-sm text-neutral-400">Hey There!</p>
        <p className="mt-2 text-3xl font-semibold">
          This is your new place to{" "}
          <span className="text-sky-700">Meet & Chat</span>
        </p>
        <p className="mt-2 text-sm text-neutral-400">
          It is always fun to meet with new people and talk about something cool
        </p>
        <div className="flex items-center justify-center mt-2">
          <button className="px-4 py-2 rounded-full bg-sky-700">
            <Link href="/api/oauth" className="flex items-center text-lg">
              Login
              <Image
                src={googleIcon}
                alt="Google Icon"
                className="ml-1 w-7 h-7 "
              />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
