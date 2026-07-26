"use client";

import { getGreeting } from "@/lib/utils";

export function Greeting() {
  const greetingMsg = getGreeting();

  return (
    <h1 className=" mt-3.5 text-3xl font-semibold">
      Good {greetingMsg} Wound.
    </h1>
  );
}
