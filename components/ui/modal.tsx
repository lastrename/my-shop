"use client";

import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="absolute inset-0 flex size-full items-center justify-center bg-black/10">
      <div className="relative">
        <button
          className="absolute right-6 top-6"
          onClick={() => {
            router.back();
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
