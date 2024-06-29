import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import App from "@/public/App.webp";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Login() {
  return (
    <div className="min-h-svh h-svh p-4 xl:pr-0 2xl:pr-14 bg-primary">
      <div className="overflow flex gap-14 h-full items-center justify-evenly">
        <div className="text-primary max-w-[500px] xl:max-w-none xl:min-w-[500px] w-full xl:w-min justify-center items-center flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <p
              className={
                plusJakartaSans.className +
                " text-center text-2xl xl:text-[40px] font-bold"
              }
            >
              Login in to Chatty
            </p>
            <p className="text-secondary xl:text-xl text-sm">
              This is your new place to{" "}
              <span className="font-medium">Meet & Chat</span>
            </p>
          </div>
          <div className="flex flex-col text-white/80 gap-2 w-full">
            <Link
              href="/api/oauth"
              className="p-3 xl:p-4 xl:gap-4 flex gap-3 justify-center items-center rounded-lg font-medium bg-black"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 256 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              Continue with Google
            </Link>
          </div>
          <div className="font-medium text-secondary text-xs">
            Made with{" "}
            <span className="text-accent-rose-red ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="11"
                fill="none"
                viewBox="0 0 13 11"
                className="inline"
              >
                <path
                  fill="#FF264A"
                  d="M6.502 10.649l-4.77-4.77A2.823 2.823 0 01.97 4.55a3.054 3.054 0 01.004-1.503c.127-.501.38-.937.757-1.309.386-.38.827-.632 1.322-.756a2.963 2.963 0 011.49 0c.498.127.94.379 1.327.756l.63.613.632-.613A2.933 2.933 0 019.945.983c.498.124.94.376 1.327.756.377.372.63.808.756 1.309.127.498.127 1 0 1.503a2.789 2.789 0 01-.756 1.327l-4.77 4.77z"
                ></path>
              </svg>
            </span>{" "}
            by <span className="underline">Mehul</span>
          </div>
        </div>
        <div className="h-full max-h-full justify-center items-center hidden xl:flex">
          <Image
            src={App}
            alt="Chatty Dashboard Image"
            className="max-h-full w-full h-full 2xl:h-auto object-cover 2xl:object-contain object-left-top py-14 pl-14 2xl:pr-14 2xl:rounded-r-lg rounded-l-lg bg-accent-purple"
          />
        </div>
      </div>
    </div>
  );
}
