"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLayout } from "@/context/layoutContext";

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
  const { transaction } = useLayout();
  let totalIncomeAmount = 0;
  let totalExpensesAmount = 0;

  for (let index = 0; index < transaction.length; index++) {
    totalExpensesAmount +=
      transaction[index].category !== "Income" ? transaction[index].amount : 0;
    totalIncomeAmount +=
      transaction[index].category == "Income" ? transaction[index].amount : 0;
  }

  let totalBalanceAmount = totalIncomeAmount - totalExpensesAmount;

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 px-5">
      {Object.entries(cards).map(
        ([key, value]: [any, dashboardProps | any]) => (
          <Card key={key} className="gap-1">
            <CardHeader>
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 ">
              <span className="text-3xl font-semibold flex gap-1 ">
                <span className="flex items-center">{value.sysmbol}</span>
                {value.title == "Total Balance"
                  ? totalBalanceAmount
                  : value.title == "Monthly Income"
                  ? totalIncomeAmount
                  : value.title == "Monthly Expenses"
                  ? totalExpensesAmount
                  : 0}
              </span>
            </CardContent>
            <CardFooter className="flex-col items-start  text-sm">
              <div className="text-muted-foreground">{value.description}</div>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
};

export default Dashboard;
