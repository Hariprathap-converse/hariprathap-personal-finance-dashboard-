import {
  Calendar,
  Home,
  Inbox,
  LucideProps,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// Menu items.
interface itemsProps {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
export function AppSidebar({ items }: { items: itemsProps[] }) {
  return (
    <Sidebar className="w-[200px] ">
      <SidebarContent>
        <SidebarGroup className="pl-5 pt-5">
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent className="pt-3">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
