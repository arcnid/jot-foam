"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function JotFormAdminPage() {
	const [formMode, setFormMode] = useState("view"); // "view" or "build"
	const [formUrl, setFormUrl] = useState("");

	const formLinks = [
		{
			title: "Onboarding Form",
			id: "250130089394152",
		},
		{
			title: "Performance Review",
			id: "250130089394153",
		},
		{
			title: "Exit Interview",
			id: "250130089394154",
		},
	];

	const handleFormSelect = (formId) => {
		setFormUrl(
			`https://form.jotform.com/${
				formMode === "build" ? "build/" : ""
			}${formId}`
		);
	};

	const toggleMode = () => {
		setFormMode((prevMode) => (prevMode === "view" ? "build" : "view"));
		// Update form URL to reflect the mode
		if (formUrl) {
			const id = formUrl.split("/").pop();
			setFormUrl(
				`https://form.jotform.com/${formMode === "build" ? "" : "build/"}${id}`
			);
		}
	};

	return (
		<div className="min-h-screen bg-neutral-900 text-white grid grid-cols-12 gap-4 p-4">
			{/* Left Sidebar */}
			<aside className="col-span-2 bg-neutral-800 p-4 rounded-lg shadow-lg">
				<h2 className="text-lg font-bold mb-4 text-gray-300">Select a Form</h2>
				<ul className="space-y-2">
					{formLinks.map((form) => (
						<li
							key={form.id}
							className="p-2 rounded cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
							onClick={() => handleFormSelect(form.id)}
						>
							{form.title}
						</li>
					))}
				</ul>

				<div className="mt-4">
					<Button
						variant="outline"
						className="w-full text-gray-300 hover:text-white"
						onClick={toggleMode}
					>
						Switch to {formMode === "view" ? "Build" : "View"} Mode
					</Button>
				</div>
			</aside>

			{/* Main Content */}
			<main className="col-span-8 bg-neutral-800 p-4 rounded-lg shadow-lg">
				<h2 className="text-xl font-bold mb-4">
					{formMode === "view" ? "Form View Mode" : "Form Build Mode"}
				</h2>
				<Separator className="mb-4 border-neutral-700" />
				{formUrl ? (
					<iframe
						src={formUrl}
						style={{
							width: "100%",
							height: "600px",
							border: "none",
							borderRadius: "8px",
						}}
						title="JotForm Admin Integration"
					></iframe>
				) : (
					<p className="text-gray-400">Please select a form to display.</p>
				)}
			</main>

			{/* Right Toolbar */}
			<aside className="col-span-2 bg-neutral-800 p-4 rounded-lg shadow-lg">
				<h2 className="text-lg font-bold mb-4 text-gray-300">Tools</h2>
				<ul className="space-y-2">
					<li>
						<Button variant="default" className="w-full">
							Preview Changes
						</Button>
					</li>
					<li>
						<Button variant="default" className="w-full">
							Save Configuration
						</Button>
					</li>
					<li>
						<Button variant="default" className="w-full">
							Reset Form
						</Button>
					</li>
					<li>
						<Button variant="destructive" className="w-full">
							Delete Form
						</Button>
					</li>
				</ul>
			</aside>
		</div>
	);
}
