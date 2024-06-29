"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import FeatherIcon from "feather-icons-react";
import { Button } from "./ui/button";
import { useAppSelector } from "@/hooks";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Chating from "@/public/Chating.png";
import Link from "next/link";
export default function MyInfo() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isAboutSectionOpen, setIsAboutSectionOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { name, picture } = useAppSelector((state) => state.myInfo);

  useEffect(() => {
    isAboutSectionOpen
      ? dialogRef.current?.showModal()
      : dialogRef.current?.close();
  }, [isAboutSectionOpen]);

  const router = useRouter();
  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <>
      <div className="pl-4 pr-1 md:px-4 flex-shrink-0 h-14 md:h-20 border-b border-b-primary flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <Avatar className="w-8 h-8 md:w-10 md:h-10">
            <AvatarImage src={picture}></AvatarImage>
            <AvatarFallback>
              <FeatherIcon icon="user" />
            </AvatarFallback>
          </Avatar>
          <p className="font-medium md:font-normal md:text-xl">{name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-8 h-8 md:w-10 md:h-10">
            <Button size="icon">
              <FeatherIcon icon="more-vertical" size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex z-20 rounded-md border-2 bg-primary border-primary flex-col gap-2 p-2 min-w-[200px]"
            align="end"
            alignOffset={0}
            sideOffset={8}
          >
            <DropdownMenuItem
              className="flex hover:bg-secondary justify-between rounded p-2 hover:outline-none"
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex justify-between w-full items-center">
                <p>Dark Mode</p>
                <Switch
                  checked={resolvedTheme === "dark"}
                  onCheckedChange={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsAboutSectionOpen(true)}
              className="p-2 rounded hover:bg-secondary hover:outline-none"
            >
              About
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="p-2 rounded hover:outline-none hover:bg-red text-red"
              onClick={() => void logout()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <dialog
        ref={dialogRef}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Escape") setIsAboutSectionOpen(false);
        }}
        className={`backdrop:bg-black/80 justify-center text-primary items-end  md:items-center bg-transparent max-w-none max-h-none h-screen w-screen ${isAboutSectionOpen ? "flex" : ""}`}
      >
        <div className="flex flex-col bg-primary w-fit md:border-2 border-primary p-2 rounded-t-2xl md:rounded-md">
          <div className="flex justify-between px-4 pt-4 md:p-5 items-center md:border-b md:border-b-primary">
            <h1 className="font-medium text-2xl text-primary">About</h1>
            <div
              onClick={() => void setIsAboutSectionOpen(false)}
              className="cursor-pointer"
            >
              <FeatherIcon
                icon="x"
                className="text-primary h-6 w-6 md:w-[30px] md:h-[30px]"
              />
            </div>
          </div>
          <div className="flex flex-col p-4 md:p-5 gap-2 md:border-b border-b-primary">
            <Image
              src={Chating}
              alt="Two people chating online"
              width={450}
              height={450}
            />
            <div>
              <div className="flex gap-2 items-center">
                <p className="font-medium text-2xl">Chatty</p>
                <Link href="https://github.com/mehulzr/chatty">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.03"
                    height="20"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 250"
                  >
                    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403z"></path>
                  </svg>
                </Link>
              </div>
              <p className="text-secondary md:text-base text-sm">
                This is your new place to{" "}
                <span className="font-medium">Meet & Chat</span>
              </p>
            </div>
          </div>
          <p className="p-4 md:p-5 text-secondary text-xs md:text-sm bg-purple md:bg-primary border-accent-purple md:border-none border-2 md:m-0 mb-8 m-2 text-center md:text-left rounded-lg md:rounded-none">
            Made with{" "}
            <span className="text-accent-rose-red inline-flex items-center">
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
            by{" "}
            <Link href="https://github.com/mehulzr" className="underline">
              Mehul
            </Link>
          </p>
        </div>
      </dialog>
    </>
  );
}
