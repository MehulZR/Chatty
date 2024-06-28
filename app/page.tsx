"use client";
import EscapeWrapper from "@/components/EscapeWrapper";
import LeftSection from "@/components/left";
import RightSection from "@/components/right";
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
