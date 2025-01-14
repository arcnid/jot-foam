import { NextResponse } from "next/server";
import { getClient } from "@/app/services/jot";

export async function GET() {
  console.log("GET /api/forms");
  const client = getClient();
  const forms = await client.user.getFolders();

  return NextResponse.json(forms);
}
