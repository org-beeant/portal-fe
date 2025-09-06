import axios from "axios";
import { getSession } from "next-auth/react";

export async function postBulkIncomeData(refNumber: string, pans: string[]) {
  const BULK_INCOME_URL =
    (process.env.NEXT_PUBLIC_BACKEND_URL || "") +
    (process.env.NEXT_PUBLIC_BULK_INCOME_URL || "");
  let sessionObj = await getSession();
  const bodydata = new URLSearchParams();

  bodydata.append("client_ref_id", refNumber);
  bodydata.append("pan_list", JSON.stringify(pans));

  try {
    const res = await axios.post(BULK_INCOME_URL, bodydata, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${(sessionObj && sessionObj.accessToken) || ""}`,
      },
    });

    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error during authorization:", error);
    return null;
  }
}

//Bulk History Fetch
export async function fetchHistoricalData(page: number = 1, size: number = 5) {
  const BULK_HISTORY_URL =
    (process.env.NEXT_PUBLIC_BACKEND_URL || "") +
    (process.env.NEXT_PUBLIC_BULK_HISTORY_URL || "");

  let sessionObj = await getSession();
  const bodydata = new URLSearchParams();

  bodydata.append("page", page.toString());
  bodydata.append("limit", size.toString());

  try {
    const res = await axios.post(BULK_HISTORY_URL, bodydata, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${(sessionObj && sessionObj.accessToken) || ""}`,
      },
    });

    const data = res.data;
    return {
      totalRows: data.total_record,
      data: data.result,
      page: page,
      size: size,
    }; // Return the sliced data and the total number of rows
  } catch (error) {
    console.error("Error during authorization:", error);
    return null;
  }
}
