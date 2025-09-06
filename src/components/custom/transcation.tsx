"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon, PenOff, Plus, SquarePen } from "lucide-react";

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

const Transcation = () => {
  const { categories, transaction, setTransaction } = useLayout();
  const [commandOpen, setcommandOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [addTransactions, setAddTransactions] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    amount: 0,
    date: "",
    actions: "view",
  });
  const removeOutline =
    "focus:outline-none focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent";
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
      <CardContent className="h-fit">
        <div className="w-full flex justify-center ">
          <Table className="mx-auto">
            <TableHeader className="h-[60px]">
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
              {transaction.map((transcation) => (
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
                    <span className="flex w-full justify-center">
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
                    console.log("e.target.value", e.target.value);
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
                    console.log("e.target.value", e.target.value);
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
                  Date of birth
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
                      {date ? date.toLocaleDateString() : "Select date"}
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
                          date: date?.toLocaleDateString(),
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
                    setTransaction((prev) => [...prev, addTransactions]);
                    window.localStorage.setItem(
                      "transaction",
                      JSON.stringify([...transaction, addTransactions])
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
