import { Chart } from "@/components/chart";
import Dashboard from "@/components/custom/dashboard";

export default function Home() {
  return (
    <>
      <Dashboard />
      <div className="w-[500px] pt-20">
        <Chart/>
      </div>
      
    </>
  );
}
