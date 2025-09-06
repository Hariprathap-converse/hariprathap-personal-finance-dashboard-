"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useLayout } from "@/context/layoutContext";
import { AppSidebar } from "./sidebar";
import { cn } from "@/lib/utils";

const SiderbarWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { sidebar, sidebarOpen, setSidebarOpen, appName } = useLayout();

  return (
    <SidebarProvider
      open={sidebarOpen}
      onOpenChange={() => {
        setSidebarOpen((prev) => !prev);
      }}
    >
      <div
        className={cn(
          "grid grid-rows-1 h-screen w-full",
          sidebarOpen == true ? "grid-cols-[200px_1fr]" : "grid-cols-[auto_1fr]"
        )}
      >
        <nav className={cn("shadow-sm")}>
          <AppSidebar items={sidebar.nav} />
        </nav>
        <main className=" w-full h-full p-2 ">
          <header className="gap-1 w-full p-2 flex items-center">
            <SidebarTrigger />
            <h1 className="text-[16px] font-semibold">{appName}</h1>
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SiderbarWrapper;
