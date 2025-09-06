"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PenOff, Plus, SquarePen } from "lucide-react";

import { useState } from "react";
import { Button } from "../ui/button";

import {
  CommandDialog,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { categoriesList } from "@/mockdata/layout";
import { useLayout } from "@/context/layoutContext";

const Categories = () => {
  const { categories, setCategories } = useLayout();
  const [inputValue, setInputValue] = useState({
    categoriesName: "",
    color: "#38bdf8",
    default: "No",
    actions: "edit",
  });
  const [isCommandBox, setCommandBox] = useState(false);
  const removeOutline =
    "focus:outline-none focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent";

  const handleSelectoption = (value: string) => {
    setInputValue((prev) => ({
      ...prev,
      actions: value,
    }));
  };
  return (
    <Card>
      <CardHeader className="flex w-full items-center justify-between">
        <CardTitle>Categories</CardTitle>
        <Button
          onClick={() => {
            setCommandBox((prev) => !prev);
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
                <TableHead className="text-start text-[16px]">Color</TableHead>
                <TableHead className="text-center text-[16px]">
                  Default
                </TableHead>
                <TableHead className="text-center text-[16px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.categoriesName}
                  className="h-[60px] text-gray-800"
                >
                  <TableCell className={cn("text-start ")}>
                    {category.categoriesName}
                  </TableCell>
                  <TableCell className={cn("text-start ")}>
                    <div className="flex items-center gap-1">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span>{category.color}</span>
                    </div>
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    {category.default}
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    <span className="flex w-full justify-center">
                      {category.actions == "edit" ? (
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
              {/* <TableRow>
                <TableCell className="text-start">Finance</TableCell>
                <TableCell className="text-start">Paid</TableCell>
                <TableCell className="text-center">Credit Card</TableCell>
                <TableCell className="text-center">Credit Card</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
        <CommandDialog
          className=""
          open={isCommandBox}
          onOpenChange={() => {
            setCommandBox((prev) => !prev);
          }}
        >
          <CommandList className="p-2 flex flex-col min-h-fit  w-full">
            <CommandItem className="my-5">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="categories">Categories</Label>
                <Input
                  id="categories"
                  placeholder="Name of Category"
                  className={cn(
                    "rounded-[4px]  hover:border hover:bg-background  focus:bg-background",
                    removeOutline
                  )}
                  onBlur={(e) => {
                    console.log("e.target.value", e.target.value);
                    setInputValue((prev) => ({
                      ...prev,
                      categoriesName: e.target.value,
                    }));
                  }}
                />
              </div>
            </CommandItem>
            <CommandItem className="my-5">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="color">Color</Label>
                <Input
                  type="color"
                  id="color"
                  placeholder="color"
                  className={cn(
                    "rounded-[4px]  hover:border hover:bg-background  focus:bg-background",
                    removeOutline
                  )}
                  onBlur={(e) => {
                    console.log("e.target.value", e.target.value);
                    setInputValue((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3 ">
                <Label htmlFor="categories">Action</Label>
                <Select onValueChange={handleSelectoption}>
                  <SelectTrigger
                    className={cn(
                      "rounded-[4px] w-full hover:bg-background",
                      removeOutline
                    )}
                  >
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm">
                    <SelectItem value="view" className="rounded-sm">
                      View
                    </SelectItem>
                    <SelectItem value="edit" className="rounded-sm">
                      Edit
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CommandItem>
            <CommandItem className="my-5 p-5">
              <div className="w-full flex items-center justify-evenly">
                <Button
                  onClick={() => {
                    setCommandBox(false);
                  }}
                  variant={"outline"}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    setCategories((prev) => [...prev, inputValue]);
                    window.localStorage.setItem(
                      "categories",
                      JSON.stringify([...categories, inputValue])
                    );
                    setCommandBox(false);
                    setInputValue({
                      categoriesName: "",
                      color: "#38bdf8",
                      default: "No",
                      actions: "edit",
                    });
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

export default Categories;
