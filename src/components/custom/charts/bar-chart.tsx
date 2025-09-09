"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useLayout } from "@/context/layoutContext";
import { options } from "./pie-chart";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export default function BarChart() {
  const { transactions } = useLayout();
  let income = 0;
  let totalExpenses = 0;
  let totalBalance = 0;
  const categoryList: string[] = [];
  let removeDuplicate;
  const expenses: {
    id: string;
    name: string;
    category: string;
    description: string;
    amount: number;
    date: string;
    actions: string;
  }[] = [];
  transactions.filter((item) => {
    item.category != "Income"
      ? (totalExpenses += item.amount)
      : (income += item.amount);
    totalBalance = income - totalExpenses;
    categoryList.push(item.category);
  });

  removeDuplicate = new Set(categoryList);

  transactions.forEach((item) => {
    removeDuplicate.forEach((origalCategory) => {
      if (item.category == origalCategory) {
        expenses.push(item);
      }
    });
  });

  const data = {
    labels: ["Total Income", "Total Expenses", "Total Balance"],
    datasets: [
      {
        label: "Total",
        data: [income, totalExpenses, totalBalance],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  expenses.map((item) => {
    data.labels.push(item.name);
    data.datasets.forEach((data) => {
      data.data.push(item.amount);
    });
  });

  return <Bar options={options} data={data} />;
}
