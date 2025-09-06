"use client";
import { DataTableHistory } from "@/app/ui/history-data-table";
import TableResponse from "@/app/ui/table-response";
import TableResponseSkeleton from "@/app/ui/table-respose-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { historyColumns } from "@/lib/columns";
import { fetchHistoricalData } from "@/lib/data";
import { History } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define schema with Zod
const formSchema = z.object({
  pan: z
    .string()
    .min(10, "PAN must be 10 characters")
    .max(10, "PAN must be 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
});

export default function Page() {
  // State for API data
  const [data, setData] = useState<History[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [historydata, setHistoryData] = useState<History[]>([]);
  const [totalRows, setTotalRows] = useState(0);

  // PAN validation state
  const [pan, setPan] = useState("");
  const [panError, setPanError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
    // Handle form submission (e.g., API call)
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const result = await fetchHistoricalData();
        //setData(result.data);
        setHistoryData(result?.data);
        setTotalRows(result?.totalRows);
      } catch (e) {
        //setData(null);
        setHistoryData([]);
        setTotalRows(0);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-3">
      <Card className="flex-1 h-[250px]">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Validate PAN Number</CardTitle>
            <CardDescription className="truncate"></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4 mt-5">
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="pannumber">PAN Number</Label>
                <Input
                  type="text"
                  id="pannumber"
                  name="pannumber"
                  placeholder="PAN Number"
                  maxLength={10}
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  title="Enter valid PAN (e.g. ABCDE1234F)"
                  required
                  autoComplete="off"
                />
                {panError && (
                  <span className="text-xs text-red-600 mt-1">{panError}</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-center overflow-auto mt-5">
            <div className="flex flex-row justify-between items-center gap-4">
              <Button className="flex-1 bg-green-900" type="submit">
                Submit
              </Button>
              <Button
                className="flex-1 bg-red-800"
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
      <Card className="flex-1 h-[250px] md:col-span-2">
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg p-2 min-h-[45px]">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                {data ? (
                  <TableResponse data={data} />
                ) : (
                  <>
                    <TableResponseSkeleton />
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center"></CardFooter>
      </Card>
      <DataTableHistory
        data={historydata}
        columns={historyColumns}
        totalRows={totalRows}
        className="bg-card rounded-xl border p-1 md:col-span-3 shadow"
      />
    </div>
  );
}
