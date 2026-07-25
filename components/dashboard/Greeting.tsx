"use client";

import { getGreeting } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Greeting() {
  const [greetingMsg, setGreetingMsg] = useState("");
  useEffect(() => {
    const receivedGreeting = getGreeting();
    setGreetingMsg(receivedGreeting);
  }, []);

  return (
    <h1 className=" mt-3.5 text-3xl font-semibold">
      Good {greetingMsg} Wound.
    </h1>
  );
}
