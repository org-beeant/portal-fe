import clsx from "clsx";
import { IdCardIcon, User2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type ResponseProps = {
  data: Record<string, any>;
};

export default function TableResponse({ data }: ResponseProps) {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available.</div>;
  }

  const headers = Object.keys(data);

  return (
    <table className="min-w-full table-fixed">
      <thead>
        <tr>
          <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">
            ENTITIES
          </th>
          <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-2/3">
            STATUS/DETAILS
          </th>
        </tr>
      </thead>
      <tbody>
        {headers.map((header) => (
          <tr key={header}>
            <td className="px-3 py-1 border-b border-gray-200 bg-white text-xs font-semibold">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-5 h-5">
                  {header === "Holder Name" && <User2Icon className="size-5" />}
                  {header === "Black Listed" && (
                    <IdCardIcon className="size-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">{header}</p>
                </div>
              </div>
            </td>
            <td className="px-3 py-1 border-b border-gray-200 bg-white text-xs">
              {data[header] === "Yes" || data[header] === "No" ? (
                <span className="relative inline-block px-3 font-semibold leading-tight">
                  <Badge
                    className={clsx({
                      "bg-gray-300 text-black": data[header] === "No",
                      "bg-red-500": data[header] === "Yes",
                    })}
                  >
                    {data[header] === "Yes" ? "Yes" : "N/A"}
                  </Badge>
                </span>
              ) : (
                <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                  <span className="relative">
                    {String(data[header]) || "N/A"}
                  </span>
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
