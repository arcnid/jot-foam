import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/utils/supabase";
export async function GET(request: NextRequest) {
	const client = getClient();

	console.log("trying to get data");

	const data = await client.from("employees").select("*");
	return NextResponse.json(data);
}
