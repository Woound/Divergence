"use client";
import { useState, useEffect } from "react";

export function ClientDate({ showTime = false }: { showTime?: boolean }) {
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    };

    let timeout: ReturnType<typeof setTimeout>;

    const update = () => {
      const now = new Date();
      setDateString(now.toLocaleString(undefined, dateOptions));
      setTimeString(now.toLocaleString(undefined, timeOptions));
    };

    // Update once per minute, aligned to the next real minute boundary.
    const scheduleNext = () => {
      const msToNextMinute = 60000 - (Date.now() % 60000);
      timeout = setTimeout(() => {
        update();
        scheduleNext();
      }, msToNextMinute);
    };

    const start = () => {
      update();
      scheduleNext();
    };

    const stop = () => clearTimeout(timeout);

    // Pause while the tab is hidden, resume (and resync) on return.
    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  if (!showTime) {
    return <span className="text-muted-foreground">{dateString}</span>;
  }

  return (
    <span className="flex flex-col items-end text-muted-foreground">
      <span>{dateString}</span>
      <span>{timeString}</span>
    </span>
  );
}
