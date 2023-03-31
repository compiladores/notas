// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Grade, getGradesForSemester } from "../../api/getGrades";
import { getTableForSemester } from "../../api/getTable";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );
  const rows = await getTableForSemester();
  const columns = Object.keys(rows[0]);
  const header = columns.join(", ") + "\n";
  const body = rows
    .map((row) => columns.map((col) => `"${row[col]}"`).join(", "))
    .join("\n");
  res
    .status(200)
    .setHeader("Content-Type", "text/csv")
    .send(header + body);
}
