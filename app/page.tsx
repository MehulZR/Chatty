"use client";
import EscapeWrapper from "@/components/EscapeWrapper";
import LeftSection from "@/components/Left";
import RightSection from "@/components/Right";
import { PusherProvider, StoreProvider } from "@/providers";

export default function Home() {
  return (
    <StoreProvider>
      <PusherProvider>
        <EscapeWrapper>
          <div className="flex min-h-svh bg-primary h-svh">
            <LeftSection />
            <RightSection />
          </div>
        </EscapeWrapper>
      </PusherProvider>
    </StoreProvider>
  );
}
