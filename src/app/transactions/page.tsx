import Transcation from "@/components/custom/transcation";

const page = () => {
  return (
    <div className="p-5">
      <Transcation dataLimit={10} />
    </div>
  );
};
export default page;
