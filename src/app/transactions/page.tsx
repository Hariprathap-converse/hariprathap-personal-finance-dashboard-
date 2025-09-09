import Transaction from "@/components/custom/transaction-table";

const page = () => {
  return (
    <div className="p-5">
      <Transaction dataLimit={10} />
    </div>
  );
};
export default page;
