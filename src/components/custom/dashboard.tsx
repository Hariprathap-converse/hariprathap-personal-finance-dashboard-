"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, IndianRupee } from "lucide-react";

interface dashboardProps {
  title: string;
  description: string;
  sysmbol: string;
  value: string;
}
const Dashboard = () => {
  const cards: any = {
    totalBalance: {
      title: "Total Balance",
      description: "Total Balance after Expensese",
      sysmbol: "$",
      value: "10,000",
    },
    monthlyIncome: {
      title: "Monthly Income",
      description: "Monthly Income",
      sysmbol: "$",
      value: "15,000",
    },
    monthlyExpenses: {
      title: "Monthly Expenses",
      description: "Monthly Expenses",
      sysmbol: "$",
      value: "5,000",
    },
    savingsRate: {
      title: "Savings Rate",
      description: "Savings Rate",
      sysmbol: "$",
      value: "1,000",
    },
  };

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2">
      {Object.entries(cards).map(([key, value]: [any, any]) => (
        <Card key={key} className="gap-1">
          <CardHeader>
            <CardTitle>{value.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 ">
            <span className="text-3xl font-semibold flex gap-1 ">
              <span className="flex items-center">{value.sysmbol}</span>
              {value.value}
            </span>
          </CardContent>
          <CardFooter className="flex-col items-start  text-sm">
            <div className="text-muted-foreground">{value.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
