import { NextResponse, NextRequest } from "next/server";
import { getClient } from "@/app/services/jot";
import { createFormFromTemplate } from "@/utils/form";

export async function POST(request: NextRequest) {
	try {
		console.log("POST /api/forms");
		const client = getClient();

		// Parse the incoming request body
		const { userData, formNumber } = await request.json();

		console.log(userData);

		if (!userData || !formNumber) {
			return NextResponse.json(
				{ error: "Missing userData or formNumber" },
				{ status: 400 }
			);
		}

		// Create a form from the provided template and user data
		const form = await createFormFromTemplate({
			templateForm: formNumber,
			userData,
			client,
		});

		return NextResponse.json(form);
	} catch (error) {
		console.error("Error in POST /api/forms:", error);
		return NextResponse.json(
			{ error: "An error occurred while creating the form" },
			{ status: 500 }
		);
	}
}
