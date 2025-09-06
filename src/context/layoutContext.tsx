"use client";
import { MockData } from "@/mockdata/layout";
import { LucideProps } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

interface MockData {
  sidebar: {
    nav: {
      title: string;
      url: string;
      icon: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
    }[];
  };
  appName: string;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LayoutContext = createContext<MockData | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebarOpen] = useState(false);
  return (
    <LayoutContext.Provider
      value={{
        sidebar: MockData.sidebar,
        appName:MockData.appName,
        sidebarOpen: sidebar,
        setSidebarOpen: setSidebarOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within LayoutProvider");
  return context;
};
