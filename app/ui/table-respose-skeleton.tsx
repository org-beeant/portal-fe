import {
  CurrencyRupeeIcon,
  DocumentCheckIcon,
  DocumentCurrencyRupeeIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  IdCardIcon,
  MapPin,
  TimerIcon,
  User2Icon,
  XCircleIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableResponseSkeleton() {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">
            Entities
          </th>
          <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-2/3">
            Status/Details
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
            <Skeleton className="h-4 w-full" />
          </td>

          <td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
            <Skeleton className="h-4 w-full" />
          </td>
        </tr>
        <tr>
          <td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
            <Skeleton className="h-4 w-full" />
          </td>

          <td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
            <Skeleton className="h-4 w-full" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
