"use client";
import { categoriesList, MockData, transcation } from "@/mockdata/layout";
import { LucideProps } from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";

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
  categories: {
    categoriesName: string;
    color: string;
    default: string;
    actions: string;
  }[];
  setCategories: React.Dispatch<
    React.SetStateAction<
      {
        categoriesName: string;
        color: string;
        default: string;
        actions: string;
      }[]
    >
  >;
  transaction: {
    id: string;
    name: string;
    category: string;
    description: string;
    amount: number;
    date: string;
    actions: string;
  }[];
  setTransaction: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
        category: string;
        description: string;
        amount: number;
        date: string;
        actions: string;
      }[]
    >
  >;
}
const LayoutContext = createContext<MockData | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebar, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState(categoriesList);
  const [transaction, setTransaction] = useState(transcation);
  useEffect(() => {
    let transactionLists = window.localStorage.getItem("transaction");
    const parsedData = JSON.parse(transactionLists as any);
    setTransaction(parsedData ? parsedData : transcation);
    let categories = window.localStorage.getItem("categories");
    const parsedDatacategories = JSON.parse(categories as any);

    setCategories(parsedDatacategories ? parsedDatacategories : categoriesList);
  }, []);
  return (
    <LayoutContext.Provider
      value={{
        sidebar: MockData.sidebar,
        appName: MockData.appName,
        sidebarOpen: sidebar,
        setSidebarOpen: setSidebarOpen,
        categories: categories,
        setCategories: setCategories,
        transaction: transaction,
        setTransaction: setTransaction,
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
