"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  PenOff,
  Plus,
  SquarePen,
  XCircle,
} from "lucide-react";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";
import { CommandDialog, CommandItem, CommandList } from "../ui/command";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useLayout } from "@/context/layoutContext";
import TransactionView from "./transaction-view";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface FilterType {
  category: null | string;
  fromDate: null | Date;
  toDate: null | Date;
  amount: null | string;
  transactionName: null | string;
}

interface MultipleConditionFilter {
  id: string;
  name: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  actions: string;
}

export interface TransactionViewType {
  state: boolean;
  transaction_id: null | string;
}
const Transaction = ({ dataLimit }: { dataLimit: number }) => {
  const { categories, transactions, setTransactions } = useLayout();
  const [commandOpen, setcommandOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState<TransactionViewType>({
    state: false,
    transaction_id: null,
  });
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(dataLimit);
  const [openCalender, setOpenCalender] = useState({
    from: false,
    to: false,
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [filterConditions, setFilterConditions] = useState<FilterType>({
    category: null,
    fromDate: null,
    toDate: null,
    amount: null,
    transactionName: null,
  });

  const [addTransactions, setAddTransactions] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    amount: 0,
    date: "",
    actions: "view",
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [filterConditions]);
  const validateCategory = (items: MultipleConditionFilter[]) => {
    const filtered = items.filter((item) => {
      if (
        filterConditions.category &&
        item.category.startsWith(filterConditions.category)
      ) {
        return item;
      }
    });
    return filtered;
  };

  const validateAmount = (items: MultipleConditionFilter[]) => {
    const filtered = items.filter((item) => {
      if (
        filterConditions.amount &&
        item.amount >= Number(filterConditions.amount)
      ) {
        console.log(item);
        return item;
      }
    });
    return filtered;
  };

  const parseDDMMYYYY = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const validateDate = (items: MultipleConditionFilter[], period: string) => {
    return items.filter((item) => {
      if (!item.date) return false;

      const itemDate = parseDDMMYYYY(item.date);

      if (filterConditions.fromDate && period === "from") {
        return itemDate >= filterConditions.fromDate;
      }

      if (filterConditions.toDate && period === "to") {
        return itemDate <= filterConditions.toDate;
      }

      if (
        filterConditions.fromDate &&
        filterConditions.toDate &&
        period === "both"
      ) {
        return (
          itemDate >= filterConditions.fromDate &&
          itemDate <= filterConditions.toDate
        );
      }

      return false;
    });
  };

  const validatetransactionName = (items: MultipleConditionFilter[]) => {
    const filtered = items.filter((item) => {
      if (
        filterConditions.transactionName &&
        item.name.startsWith(filterConditions.transactionName)
      ) {
        return item;
      }
    });
    return filtered;
  };

  let filterData = [...transactions];
  if (filterConditions.category) {
    filterData = validateCategory(filterData);
  }
  if (filterConditions.amount) {
    filterData = validateAmount(filterData);
  }
  if (filterConditions.fromDate || filterConditions.toDate) {
    filterData = validateDate(
      filterData,
      filterConditions.fromDate ? "from" : "to"
    );
  }
  if (filterConditions.fromDate && filterConditions.toDate) {
    filterData = validateDate(filterData, "both");
  }
  if (filterConditions.transactionName) {
    filterData = validatetransactionName(filterData);
  }

  const removeOutline =
    "focus:outline-none focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent";

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  filterData = filterData.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Card>
      <CardHeader className="flex w-full items-center justify-between">
        <CardTitle>Transaction</CardTitle>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              setFilterConditions(() => ({
                category: null,
                fromDate: null,
                toDate: null,
                amount: null,
                transactionName: null,
              }));
              setSelectedValue("");
            }}
            variant={"outline"}
            className="w-fit  "
          >
            Clear All Fillter
          </Button>
          <Button
            onClick={() => {
              setcommandOpen((prev) => !prev);
            }}
            className="cursor-pointer"
          >
            <Plus /> Add Categories
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-fit flex flex-col gap-5">
        {openView.state && (
          <TransactionView
            openView={openView}
            setOpenView={setOpenView}
            transaction={transactions.find((item) => {
              return item.id == openView.transaction_id;
            })}
          />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4   p-5 pb-6 rounded-sm border w-full gap-3  ">
          <div className="h-full relative  flex flex-col gap-2 ">
            {filterConditions.category && (
              <Tooltip>
                <TooltipTrigger className="absolute right-2 top-2 h-fit w-fit">
                  <XCircle
                    onClick={() => {
                      setFilterConditions((prev) => ({
                        ...prev,
                        category: null,
                      }));
                      setSelectedValue("");
                    }}
                    className="h-4 w-4 text-gray-600 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear Category Filter</p>
                </TooltipContent>
              </Tooltip>
            )}
            <label className="" htmlFor="category">
              By Category
            </label>

            <Select
              onValueChange={(events) => {
                setFilterConditions((prev) => ({
                  ...prev,
                  category: events,
                }));
                setSelectedValue(events);
              }}
              value={selectedValue}
            >
              <SelectTrigger
                id="category"
                name="category"
                className={cn(
                  "rounded-[4px] w-full hover:bg-background",
                  removeOutline
                )}
              >
                {selectedValue ? selectedValue : "Search by Category"}
              </SelectTrigger>
              <SelectContent className="rounded-sm overflow-auto">
                {categories?.map((category: any) => (
                  <SelectItem
                    key={category.categoriesName}
                    value={category.categoriesName}
                    className="rounded-sm"
                  >
                    {category.categoriesName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="group h-full  grid grid-cols-2 px-2 bg-accent border rounded-sm justify-center gap-2">
            <div className="h-full flex flex-col gap-2 pb-2 ">
              <label htmlFor="date">From Date</label>
              <Popover
                open={openCalender.from}
                onOpenChange={() => {
                  setOpenCalender((prev) => ({
                    ...prev,
                    from: !prev.from,
                  }));
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "rounded-[4px]  hover:border hover:bg-accent  focus:bg-accent",
                      removeOutline,
                      " justify-between text-gray-500 font-normal text-left w-full flex "
                    )}
                  >
                    <span
                      className={cn(
                        filterConditions.fromDate ? "text-foreground" : ""
                      )}
                    >
                      {filterConditions.fromDate
                        ? filterConditions.fromDate.toLocaleDateString("en-GB")
                        : "From Date"}
                    </span>
                    <ChevronDownIcon className="size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-fit border-none">
                  <Calendar
                    mode="single"
                    defaultMonth={filterConditions.fromDate as Date}
                    selected={filterConditions.fromDate as Date}
                    onSelect={(date) => {
                      setFilterConditions((prev: any) => ({
                        ...prev,
                        fromDate: date,
                      }));
                    }}
                    className="rounded-lg border shadow-sm "
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-full flex flex-col gap-2 ">
              <label htmlFor="date">To Date</label>
              <Popover
                open={openCalender.to}
                onOpenChange={() => {
                  setOpenCalender((prev) => ({
                    ...prev,
                    to: !prev.to,
                  }));
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "rounded-[4px]  hover:border hover:bg-accent  focus:bg-accent",
                      removeOutline,
                      " justify-between text-gray-500 font-normal text-left w-full flex "
                    )}
                  >
                    <span
                      className={cn(
                        filterConditions.toDate ? "text-foreground" : ""
                      )}
                    >
                      {filterConditions.toDate
                        ? filterConditions.toDate.toLocaleDateString("en-GB")
                        : "To Date"}
                    </span>
                    <ChevronDownIcon className="size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-fit border-none">
                  <Calendar
                    mode="single"
                    defaultMonth={filterConditions.toDate as Date}
                    selected={filterConditions.toDate as Date}
                    onSelect={(date) => {
                      setFilterConditions((prev: any) => ({
                        ...prev,
                        toDate: date,
                      }));
                    }}
                    className="rounded-lg border shadow-sm "
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="h-full flex flex-col gap-2 ">
            <label htmlFor="amount">Amount</label>
            <Input
              type="number"
              id="amount"
              name="amount"
              className={cn(
                "rounded-[4px]  hover:border hover:bg-accent  focus:bg-accent",
                removeOutline
              )}
              value={filterConditions.amount ?? ""}
              onChange={(e) => {
                setFilterConditions((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }));
              }}
              placeholder="Search by Amount"
            ></Input>
          </div>
          <div className="h-full flex flex-col gap-2 ">
            <label htmlFor="transaction_name">Transaction Name </label>
            <Input
              id="transaction_name"
              name="transaction_name"
              className={cn(
                "rounded-[4px]  hover:border hover:bg-accent  focus:bg-accent",
                removeOutline
              )}
              value={filterConditions.transactionName ?? ""}
              onChange={(e) => {
                setFilterConditions((prev) => ({
                  ...prev,
                  transactionName: e.target.value,
                }));
              }}
              placeholder="Search by Transaction Name "
            ></Input>
          </div>
        </div>
        <div
          className={cn(
            "w-full flex justify-center border   rounded-sm px-2 py-1 ",
            dataLimit == 5 ? "h-[380px]" : "h-[550px]"
          )}
        >
          <Table className="mx-auto relative overflow-auto ">
            <TableHeader className="h-[60px] sticky top-0 bg-background">
              <TableRow className="text-center">
                <TableHead className="text-start text-[16px]">Name</TableHead>
                <TableHead className="text-start text-[16px]">
                  Category
                </TableHead>
                <TableHead className="text-center text-[16px]">
                  Amount
                </TableHead>
                <TableHead className="text-center text-[16px]">Date</TableHead>
                <TableHead className="text-center text-[16px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData.map((transaction) => (
                <TableRow
                  key={transaction.name}
                  className="h-[60px] text-gray-800"
                >
                  <TableCell className={cn("text-start ")}>
                    {transaction.name}
                  </TableCell>
                  <TableCell className={cn("text-start ")}>
                    {transaction.category}
                  </TableCell>
                  <TableCell className={cn("text-center ")}>
                    <span>{transaction.amount}</span>
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    {transaction.date}
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    <span className="flex w-full justify-center gap-3">
                      <EyeIcon
                        onClick={() => {
                          setOpenView((prev) => ({
                            state: !prev.state,
                            transaction_id: transaction.id,
                          }));
                        }}
                        className="h-4 w-4 text-gray-600 cursor-pointer"
                      />
                      {transaction.actions == "edit" ? (
                        <SquarePen className="h-4 w-4 text-gray-600 cursor-pointer" />
                      ) : (
                        <>
                          <PenOff className="h-4 w-4 text-gray-400 cursor-not-allowed" />
                        </>
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon />
                <span className="hidden sm:block">Previous</span>
              </Button>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                className="cursor-pointer"
                variant={"outline"}
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </Button>
            ))}
            <PaginationItem>
              <Button
                className="cursor-pointer"
                variant={"outline"}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span className="*:hidden sm:block">Next</span>
                <ChevronRightIcon />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <CommandDialog
          className=""
          open={commandOpen}
          onOpenChange={() => {
            setcommandOpen((prev) => !prev);
          }}
        >
          <CommandList className="p-2 flex flex-col min-h-fit  w-full">
            <CommandItem className="my-5 !mb-3">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="name">Transaction Name</Label>
                <Input
                  id="name"
                  placeholder="Name of Category"
                  className={cn(
                    "rounded-[4px]  hover:border hover:bg-background  focus:bg-background",
                    removeOutline
                  )}
                  onBlur={(e) => {
                    setAddTransactions((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
            </CommandItem>

            <CommandItem className="my-5 !mb-3">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Amount for this Transaction"
                  className={cn(
                    "rounded-[4px]  hover:border hover:bg-background  focus:bg-background",
                    removeOutline
                  )}
                  onBlur={(e) => {
                    setAddTransactions((prev) => ({
                      ...prev,
                      amount: Number(e.target.value),
                    }));
                  }}
                />
              </div>
            </CommandItem>

            <CommandItem className="my-5 !mb-3">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  className={cn(
                    "rounded-[4px]  hover:border hover:bg-background  focus:bg-background",
                    removeOutline
                  )}
                  placeholder="Type your message here."
                  onBlur={(e) => {
                    setAddTransactions((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                />
              </div>
            </CommandItem>

            <CommandItem className="my-5 !mb-3">
              <div className="grid w-full max-w-sm items-center gap-3 ">
                <Label htmlFor="categories">Category</Label>
                <Select
                  onValueChange={(events) => {
                    setAddTransactions((prev) => ({
                      ...prev,
                      category: events,
                    }));
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      "rounded-[4px] w-full hover:bg-background",
                      removeOutline
                    )}
                  >
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm overflow-auto">
                    {categories?.map((category: any) => (
                      <SelectItem
                        key={category.categoriesName}
                        value={category.categoriesName}
                        className="rounded-sm"
                      >
                        {category.categoriesName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CommandItem>

            <CommandItem className="my-5 !mb-3">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="date" className="px-1">
                  Date of Transaction
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className={cn(
                        "rounded-[4px] justify-between font-normal  hover:border hover:bg-background  focus:bg-background",
                        removeOutline
                      )}
                    >
                      {date ? date.toLocaleDateString("en-GB") : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      className={cn(
                        "rounded-[4px]  hover:border hover:bg-background  focus:bg-background",
                        removeOutline
                      )}
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                        setAddTransactions((prev: any) => ({
                          ...prev,
                          date: date?.toLocaleDateString("en-GB"),
                        }));
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CommandItem>

            <CommandItem className="my-5 p-5">
              <div className="w-full flex items-center justify-evenly">
                <Button
                  onClick={() => {
                    setcommandOpen(false);
                  }}
                  variant={"outline"}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    setcommandOpen(false);
                    setTransactions((prev) => [...prev, addTransactions]);
                    window.localStorage.setItem(
                      "transaction",
                      JSON.stringify([...transactions, addTransactions])
                    );
                  }}
                >
                  Create
                </Button>
              </div>
            </CommandItem>
          </CommandList>
        </CommandDialog>
      </CardContent>
    </Card>
  );
};

export default Transaction;
