"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenu,
} from "@/components/ui/sidebar";
import sideBarLogo from "@/assets/mark-mint.svg";
import Image from "next/image";
import {
  LayoutDashboard,
  Notebook,
  ListChecks,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { CustomSidebarTrigger } from "./CustomSidebarTrigger";

const sidebarMenuButtons = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    isActive: true,
    link: "/",
  },
  {
    icon: Notebook,
    name: "Journal",
    isActive: false,
    link: "/journal",
  },
  {
    icon: ListChecks,
    name: "Habits",
    isActive: false,
    link: "/habits",
  },
  {
    icon: TrendingUp,
    name: "Insights",
    isActive: false,
    link: "/insights",
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-3 mt-2 items-center pr-2 group-data-[collapsible=icon]:pr-0 group-data-[collapsible=icon]:justify-center">
          <Image
            src={sideBarLogo}
            alt="Divergence logo in the sidebar"
            className=" w-10 h-10 shrink-0"
          />
          <span className=" font-bold text-2xl group-data-[collapsible=icon]:hidden">
            Divergence
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className=" gap-1">
          {sidebarMenuButtons.map((menuButton) => (
            <SidebarMenuItem
              key={`sidebar-link-${menuButton.name}`}
              className="mx-2.5"
            >
              <SidebarMenuButton
                isActive={menuButton.isActive}
                className="cursor-pointer py-5 flex pl-4"
              >
                <Link
                  href={menuButton.link}
                  className="text-base flex items-center gap-2"
                >
                  {<menuButton.icon />}
                  <span>{menuButton.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <CustomSidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
