import { useState, useEffect } from "react";

export function ClientDate() {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    setDateString(new Date().toLocaleDateString(undefined, options));
  }, []);

  return <span className=" text-muted-foreground">{dateString}</span>;
}
