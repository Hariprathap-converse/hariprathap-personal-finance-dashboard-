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
} from "lucide-react";

import { Button } from "../ui/button";
import { useState } from "react";
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
import TransactionView from "./transcation-view";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface FilterType {
  category: null | string;
  dateFilter: null | Date;
  amount: null | string;
  transactionName: null | string;
}
export interface TransactionViewType {
  state: boolean;
  transaction_id: null | string;
}
const Transcation = ({ dataLimit }: { dataLimit: number }) => {
  const { categories, transcations, setTransactions } = useLayout();
  const [commandOpen, setcommandOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState<TransactionViewType>({
    state: false,
    transaction_id: null,
  });
  const [openCalender, setOpenCalender] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [filterConditions, setFilterConditions] = useState<FilterType>({
    category: null,
    dateFilter: null,
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

  const validateCategory = (
    items: {
      id: string;
      name: string;
      category: string;
      description: string;
      amount: number;
      date: string;
      actions: string;
    }[]
  ) => {
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

  const validateAmount = (
    items: {
      id: string;
      name: string;
      category: string;
      description: string;
      amount: number;
      date: string;
      actions: string;
    }[]
  ) => {
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

  const validateDate = (
    items: {
      id: string;
      name: string;
      category: string;
      description: string;
      amount: number;
      date: string;
      actions: string;
    }[]
  ) => {
    const filtered = items.filter((item) => {
      if (
        filterConditions.dateFilter &&
        item.date == filterConditions.dateFilter.toLocaleDateString("en-GB")
      ) {
        return item;
      }
    });
    return filtered;
  };

  const validatetransactionName = (
    items: {
      id: string;
      name: string;
      category: string;
      description: string;
      amount: number;
      date: string;
      actions: string;
    }[]
  ) => {
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

  let filterData = [...transcations];
  if (filterConditions.category) {
    filterData = validateCategory(filterData);
  }
  if (filterConditions.amount) {
    filterData = validateAmount(filterData);
  }
  if (filterConditions.dateFilter) {
    filterData = validateDate(filterData);
  }
  if (filterConditions.transactionName) {
    filterData = validatetransactionName(filterData);
  }

  const removeOutline =
    "focus:outline-none focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent";

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(dataLimit);

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
        <CardTitle>Transcation</CardTitle>
        <Button
          onClick={() => {
            setcommandOpen((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          <Plus /> Add Categories
        </Button>
      </CardHeader>
      <CardContent className="h-fit flex flex-col gap-5">
        {openView.state && (
          <TransactionView
            openView={openView}
            setOpenView={setOpenView}
            transcation={transcations.find((item) => {
              return item.id == openView.transaction_id;
            })}
          />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4   p-5 pb-6 rounded-sm border w-full gap-3  ">
          <div className="h-full flex flex-col gap-2 ">
            <label htmlFor="category">By Category</label>
            <Select
              onValueChange={(events) => {
                setFilterConditions((prev) => ({
                  ...prev,
                  category: events,
                }));
              }}
            >
              <SelectTrigger
                id="category"
                name="category"
                className={cn(
                  "rounded-[4px] w-full hover:bg-background",
                  removeOutline
                )}
              >
                <SelectValue placeholder="Search by Category" />
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
          <div className="h-full flex flex-col gap-2 ">
            <label htmlFor="date">Date</label>
            <Popover
              open={openCalender}
              onOpenChange={() => {
                setOpenCalender((prev) => !prev);
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
                  <span className={cn(filterConditions.dateFilter?"text-foreground":"")}>
                    {filterConditions.dateFilter
                      ? filterConditions.dateFilter.toLocaleDateString("en-GB")
                      : "Select a Date"}
                  </span>
                  <ChevronDownIcon className="size-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-fit border-none">
                <Calendar
                  mode="single"
                  defaultMonth={filterConditions.dateFilter as Date}
                  selected={filterConditions.dateFilter as Date}
                  onSelect={(date) => {
                    setFilterConditions((prev: any) => ({
                      ...prev,
                      dateFilter: date,
                    }));
                  }}
                  className="rounded-lg border shadow-sm "
                />
              </PopoverContent>
            </Popover>
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
            <label htmlFor="transcation_name">Transcation Name </label>
            <Input
              id="transcation_name"
              name="transcation_name"
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
              placeholder="Search by Transcation Name "
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
              {filterData.map((transcation) => (
                <TableRow
                  key={transcation.name}
                  className="h-[60px] text-gray-800"
                >
                  <TableCell className={cn("text-start ")}>
                    {transcation.name}
                  </TableCell>
                  <TableCell className={cn("text-start ")}>
                    {transcation.category}
                  </TableCell>
                  <TableCell className={cn("text-center ")}>
                    <span>{transcation.amount}</span>
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    {transcation.date}
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    <span className="flex w-full justify-center gap-3">
                      <EyeIcon
                        onClick={() => {
                          setOpenView((prev) => ({
                            state: !prev.state,
                            transaction_id: transcation.id,
                          }));
                        }}
                        className="h-4 w-4 text-gray-600 cursor-pointer"
                      />
                      {transcation.actions == "edit" ? (
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
                    <SelectValue placeholder="Action" />
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
                      JSON.stringify([...transcations, addTransactions])
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

export default Transcation;
