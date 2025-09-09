import BarChart from "@/components/custom/charts/bar-chart";
import DoughnutCharts from "@/components/custom/charts/dough-nut-chart";
import LineCharts from "@/components/custom/charts/line-char";
import Charts from "@/components/custom/charts/pie-chart";
import Dashboard from "@/components/custom/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <Dashboard />
      <div className="px-5">
        <Card className="">
          <CardHeader>
            <CardTitle>Data Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className=" grid grid-cols-1 mx-auto xl:grid-cols-2 xl:p-20 border rounded-sm">
              <div className="2xl:w-[60%] w-full">
                <Charts />
              </div>
              <div className="2xl:w-[60%] w-full">
                <DoughnutCharts />
              </div>

              <div className="2xl:w-[90%] w-full border p-5 rounded-sm mt-10">
                <BarChart />
              </div>
              <div className="2xl:w-[90%] w-full border p-5 rounded-sm mt-10">
                <LineCharts />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
