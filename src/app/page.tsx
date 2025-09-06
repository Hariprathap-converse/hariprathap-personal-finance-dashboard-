"use client";
import Dashboard from "@/components/custom/dashboard";
import { AppSidebar } from "@/components/custom/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLayout } from "@/context/layoutContext";
import { cn } from "@/lib/utils";

export default function Home() {
  const { sidebar, sidebarOpen, setSidebarOpen, appName } = useLayout();
  return (
    <SidebarProvider
      open={sidebarOpen}
      onOpenChange={() => {
        setSidebarOpen((prev) => !prev);
      }}
    >
      <div
        className={cn(" grid grid-rows-1 grid-cols-[auto_1fr] h-screen w-full")}
      >
        <nav className={cn("shadow-sm")}>
          <AppSidebar items={sidebar.nav} />
        </nav>
        <main className=" h-full ">
          <header className="gap-1 w-full p-2 flex items-center">
            <SidebarTrigger />
            <h1 className="text-[16px] font-semibold">{appName}</h1>
          </header>
          <Dashboard />
        </main>
      </div>
    </SidebarProvider>
  );
}
