"use client";
import { DataTableHistory } from "@/app/ui/history-data-table";
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
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import { historyColumns } from "@/lib/columns";
import { fetchHistoricalData } from "@/lib/data";
import { History } from "@/lib/definitions";

export default function Page() {
  // State for dynamic rows
  const [rows, setRows] = useState([{ pan: "" }]);
  const [ref, setRef] = useState("");
  const maxRows = 10;

  // State for API data
  const [data, setData] = useState<History[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [historydata, setHistoryData] = useState<History[]>([]);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const result = await fetchHistoricalData();
        setData(result.data);
        setHistoryData(result.data);
        setTotalRows(result.totalRows);
      } catch (e) {
        setData(null);
        setHistoryData([]);
        setTotalRows(0);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleAddRow = () => {
    if (rows.length < maxRows) {
      setRows([...rows, { pan: "" }]);
    }
  };

  const handleRemoveRow = (idx: number) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== idx));
  };

  // Placeholder for refresh logic
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleInputChange = (idx: number, value: string) => {
    const updated = [...rows];
    updated[idx].pan = value;
    setRows(updated);
  };

  return (
    <div className="grid gap-y-4 p-4 sm:grid-cols-1 md:grid-cols-1">
      <Card className="flex-1 h-auto">
        <form method="post">
          <CardHeader>
            <CardTitle>Bulk PAN Validation</CardTitle>
            <CardDescription className="truncate">
              Enter up to 10 PANs with reference numbers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 mt-5">
              <label htmlFor="ref" className="block text-xs font-medium mb-1">
                Ref #
              </label>
              <Input
                type="text"
                id="ref"
                name="ref"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                required
                className="h-7 text-xs px-2 py-1 w-48"
              />
            </div>
            <div className="flex md:justify-end sm:m-10 mb-2">
              {rows.length < maxRows && (
                <span
                  className="h-7 w-7 flex items-center justify-center"
                  onClick={handleAddRow}
                  title="Add another row"
                >
                  <PlusCircleIcon className="size-7 fill" />
                </span>
              )}
            </div>
            <div className="flex md:justify-center mb-10">
              <div className="md:w-2/3 sm:w-full">
                <table className="min-w-full text-xs mx-auto">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-2 py-1 border">S.No</th>
                      <th className="px-2 py-1 border">PAN</th>
                      <th className="px-2 py-1 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={idx} className="align-middle">
                        <td className="px-2 py-1 border text-center font-bold">
                          {idx + 1}
                        </td>
                        <td className="px-2 py-1 border">
                          <Input
                            type="text"
                            id={`pan-${idx}`}
                            name={`pan-${idx}`}
                            maxLength={10}
                            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                            title="Enter valid PAN (e.g. ABCDE1234F)"
                            value={row.pan}
                            onChange={(e) =>
                              handleInputChange(idx, e.target.value)
                            }
                            required
                            className="h-7 text-xs px-2 py-1"
                          />
                        </td>
                        <td className="px-2 py-1 border text-center">
                          {rows.length > 1 && (
                            <span
                              className="h-7 w-7 flex items-center justify-center cursor-pointer text-red-500 hover:text-red-700 mx-auto"
                              onClick={() => handleRemoveRow(idx)}
                              title="Remove this row"
                            >
                              <Trash2Icon className="size-5" />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-center overflow-auto">
            <div className="flex flex-row justify-between items-center gap-4">
              <Button className="flex-1 bg-blue-500" type="submit">
                Submit
              </Button>
              <Button
                className="flex-1 bg-blue-500"
                onClick={() => window.location.reload()}
              >
                Cancel
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
      {/* Status card removed as requested */}
      <DataTableHistory
        data={historydata}
        columns={historyColumns}
        totalRows={totalRows}
        className="bg-card rounded-xl border p-1 shadow"
      />
    </div>
  );
}
