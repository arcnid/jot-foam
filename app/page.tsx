"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
	const router = useRouter();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white font-sans">
			<h1 className="text-4xl font-bold mb-6">
				Prefill Form Management System
			</h1>
			<p className="text-lg text-gray-400 mb-8 text-center max-w-2xl">
				📄Create and manage form templates!
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
				{/* Form Dispatch Section */}
				<div className="flex flex-col items-center bg-neutral-800 p-6 rounded-lg shadow-lg">
					<h2 className="text-xl font-semibold text-gray-300 mb-4">
						Form Dispatch
					</h2>
					<p className="text-sm text-gray-400 mb-4 text-center">
						Dispatch forms to employees and manage their prefilled
						configurations.
					</p>
					<Button
						variant="primary"
						className="w-full bg-blue-500 hover:bg-blue-400 text-white"
						onClick={() => router.push("/form")}
					>
						Go to Form Dispatch
					</Button>
				</div>

				{/* Data and Metrics Section */}
				<div className="flex flex-col items-center bg-neutral-800 p-6 rounded-lg shadow-lg">
					<h2 className="text-xl font-semibold text-gray-300 mb-4">
						Data and Metrics
					</h2>
					<p className="text-sm text-gray-400 mb-4 text-center">
						Pull data and analyze metrics from submitted forms.
					</p>
					<Button
						variant="primary"
						className="w-full bg-blue-500 hover:bg-blue-400 text-white"
						onClick={() => router.push("/data")}
					>
						Go to Data and Metrics
					</Button>
				</div>

				{/* Data Management Setup Section */}
				<div className="flex flex-col items-center bg-neutral-800 p-6 rounded-lg shadow-lg">
					<h2 className="text-xl font-semibold text-gray-300 mb-4">
						Embedded Environment
					</h2>
					<p className="text-sm text-gray-400 mb-4 text-center">
						Configure and manage from an embedded JotForm environment.
					</p>
					<Button
						variant="primary"
						className="w-full bg-blue-500 hover:bg-blue-400 text-white"
						onClick={() => router.push("/embedded")}
					>
						Go to Embedded
					</Button>
				</div>
			</div>

			<Separator className="border-neutral-700 my-8 w-full max-w-4xl" />
		</div>
	);
}
