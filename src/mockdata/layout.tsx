import { DollarSign, Home, LayoutGrid, Search, Settings } from "lucide-react";

export const MockData = {
  sidebar: {
    nav: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Transaction",
        url: "/transactions",
        icon: DollarSign,
      },
      {
        title: "Categories",
        url: "/categories",
        icon: LayoutGrid,
      },
    ],
  },
  appName: "Finance Tracker",
};

export const categoriesList = [
  {
    categoriesName: "Entertainment",
    color: "#9966FF",
    default: "Yes",
    actions: "edit",
  },
  {
    categoriesName: "Food",
    color: "#FF6384",
    default: "Yes",
    actions: "edit",
  },
  {
    categoriesName: "Transport",
    color: "#8BC34A",
    default: "Yes",
    actions: "edit",
  },
  {
    categoriesName: "Bills",
    color: "#36A2EB",
    default: "Yes",
    actions: "edit",
  },
  {
    categoriesName: "Income",
    color: "#4CAF50",
    default: "Yes",
    actions: "view",
  },
];

export const transcation = [
  {
    id: "0",
    name: "Transcation 1",
    category: "Expenses",
    description: "",
    amount: 1111,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "1",
    name: "Transcation 11",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "2",
    name: "Transcation2",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "3",
    name: "Transcation3",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "4",
    name: "Transcation4",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "5",
    name: "Transcation5",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "6",
    name: "Transcation6",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "7",
    name: "Transcation7",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "8",
    name: "Transcation8",
    category: "Expenses",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "9",
    name: "Transcation9",
    category: "Income",
    description: "",
    amount: 1000,
    date: "9/6/2025",
    actions: "view",
  },
  {
    id: "10",
    name: "Transcation10",
    category: "Income",
    description: "",
    amount: 10000,
    date: "9/6/2025",
    actions: "view",
  },
];
