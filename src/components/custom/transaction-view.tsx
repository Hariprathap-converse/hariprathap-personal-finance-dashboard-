import React, { SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { TransactionViewType } from "./transaction-table";

interface TransactionViewProps {
  openView: TransactionViewType;
  setOpenView: React.Dispatch<SetStateAction<TransactionViewType>>;
  transaction:
    | {
        id: string;
        name: string;
        category: string;
        description: string;
        amount: number;
        date: string;
        actions: string;
      }
    | undefined;
}

const TransactionView: React.FC<TransactionViewProps> = ({
  openView,
  setOpenView,
  transaction,
}) => {
  console.log("transaction", transaction);
  return (
    <Dialog
      open={openView.state}
      onOpenChange={() => {
        setOpenView((prev) => ({
          ...prev,
          sate: !prev.state,
        }));
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex flex-col bg-[hsl(0,0%,90%)] "
      >
        <DialogHeader className="mb-1">
          <X
            className="right-5 top-5 absolute text-gray-600 cursor-pointer"
            onClick={() => {
              setOpenView((prev) => ({
                ...prev,
                state: !prev.state,
              }));
            }}
          />
          <DialogTitle className="text-2xl">Transaction overview</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 justify-center border p-5 rounded-sm bg-[hsl(0,0%,98%)]">
          <div className="grid  gap-2 items-center">
            <Label>Transaction Name</Label>
            <span className="h-full w-full p-1 pl-2 border rounded-sm">
              {transaction?.name}
            </span>
          </div>
          <div className="grid  gap-2 items-center">
            <Label>Transaction Category</Label>
            <span className="h-full w-full p-1 pl-2 border rounded-sm">
              {" "}
              {transaction?.category}
            </span>
          </div>
          <div className="grid  gap-2 items-center">
            <Label>Transaction Description</Label>
            <span className="h-full w-full p-1 pl-2 border rounded-sm">
              {transaction?.description ? transaction.description : "Null"}
            </span>
          </div>
          <div className="grid  gap-2 items-center">
            <Label>Transaction Amount</Label>
            <span className="h-full w-full p-1 pl-2 border rounded-sm">
              {transaction?.amount}
            </span>
          </div>
          <div className="grid  gap-2 items-center">
            <Label>Transaction Date</Label>
            <span className="h-full w-full p-1 pl-2 border rounded-sm">
              {transaction?.date}
            </span>
          </div>
          <div className="grid  gap-2 items-center">
            <Label>Transaction Actions</Label>
            <span className="h-full w-full p-1 pl-2 border rounded-sm">
              {transaction?.actions}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionView;
