"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronLeft } from "lucide-react";

export function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 flex group-data-[collapsible=icon]:justify-center"
    >
      <ChevronLeft className="w-10 shrink-0" />
      <span className="group-data-[collapsible=icon]:hidden">Collapse</span>
    </button>
  );
}
