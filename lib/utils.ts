import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting() {
  const currentTime = new Date().getHours();
  console.log(currentTime);

  if (currentTime >= 12 && currentTime < 18) {
    return "Afternoon";
  } else if (currentTime >= 18 && currentTime < 0) {
    return "Evening";
  } else if (currentTime >= 0 && currentTime < 5) {
    return "Night";
  } else {
    return "Morning";
  }
}
