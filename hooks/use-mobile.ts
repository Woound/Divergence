import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

let mql: MediaQueryList | null = null;
function getMql() {
  if (!mql) mql = window.matchMedia(QUERY);
  return mql;
}

function subscribe(onStoreChange: () => void) {
  const m = getMql();
  m.addEventListener("change", onStoreChange);
  return () => m.removeEventListener("change", onStoreChange);
}

const getSnapshot = () => getMql().matches;
const getServerSnapshot = () => false;

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
