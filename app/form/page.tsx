"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
	const [employees, setEmployees] = useState(undefined); // Start as `undefined`
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null); // Track errors

	const formLinks = [
		{
			title: "AppointmentRequest",
			url: "https://form.jotform.com/250130089394152",
			id: "250130089394152",
		},
		{
			title: "",
			url: "https://form.jotform.com/250130089394153",
			id: "250130089394153",
		},
		{
			title: "Exit Interview",
			url: "https://form.jotform.com/250130089394154",
			id: "250130089394154",
		},
	];

	const router = useRouter();

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await fetch("/api/employees", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (response.ok) {
					const data = await response.json();
					if (data && Array.isArray(data.data)) {
						setEmployees(data.data);
					} else {
						setError("Invalid employee data received.");
					}
				} else {
					setError("Failed to fetch employees from the server.");
				}
			} catch (error) {
				setError("An error occurred while fetching employees.");
			} finally {
				setLoading(false);
			}
		};

		fetchEmployees();
	}, []);

	const handlePrefillForm = async (formId) => {
		if (!selectedEmployee) {
			alert("Please select an employee first.");
			return;
		}

		try {
			const response = await fetch("/api/forms", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userData: selectedEmployee,
					formNumber: formId,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				if (data?.newLink) {
					window.open(data.newLink, "_blank");
				} else {
					alert("Failed to generate prefilled form link.");
				}
			} else {
				alert("Failed to query the backend for the prefilled form.");
			}
		} catch (error) {
			alert("An error occurred while processing the prefilled form.");
		}
	};

	if (loading) {
		return <div className="p-8 text-white">Loading employees...</div>;
	}

	if (error) {
		return <div className="p-8 text-red-500">{error}</div>;
	}

	if (!employees || employees.length === 0) {
		return <div className="p-8 text-gray-400">No employees found.</div>;
	}

	return (
		<div className="min-h-screen bg-neutral-900 text-white font-sans">
			{/* Header Navigation */}
			<header className="flex items-center justify-between p-4 bg-neutral-800 shadow-md">
				<nav className="text-gray-400">
					<span
						className="cursor-pointer hover:text-white"
						onClick={() => router.push("/")}
					>
						Home
					</span>{" "}
					/ <span className="text-gray-500">Form Dispatch Dashboard</span>
				</nav>
			</header>

			<div className="grid grid-cols-3 gap-8 p-8">
				{/* Employee List and Details */}
				<aside className="col-span-1 bg-neutral-800 shadow-lg rounded-lg p-4 flex flex-col max-h-screen">
					<div className="mb-4">
						<Button
							variant="primary"
							className="w-full bg-blue-500 hover:bg-blue-400 text-white"
							onClick={() => console.log("Add User Clicked")}
						>
							Add User
						</Button>
					</div>

					<div
						className="overflow-y-auto border-b border-neutral-700 pb-4 flex-grow"
						style={{
							maxHeight: "40%",
							scrollbarWidth: "thin",
							scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
						}}
					>
						<h2 className="text-lg font-bold mb-4 text-gray-300">Employees</h2>
						<ul className="space-y-2">
							{employees.map((employee) => (
								<li
									key={employee.id}
									className={`p-2 rounded cursor-pointer transition-all ${
										selectedEmployee?.id === employee.id
											? "bg-blue-500 text-white font-medium"
											: "hover:bg-neutral-700 text-gray-300"
									}`}
									onClick={() => setSelectedEmployee(employee)}
								>
									{employee.first_name} {employee.last_name}
								</li>
							))}
						</ul>
					</div>

					<div
						className="pt-4 flex-grow"
						style={{
							maxHeight: 120,
						}}
					>
						<h2 className="text-lg font-bold mb-4 border-b pb-2 text-gray-300">
							Employee Details
						</h2>
						{selectedEmployee ? (
							<div className="space-y-2">
								<p>
									<strong className="text-gray-400">Name:</strong>{" "}
									{selectedEmployee.first_name} {selectedEmployee.last_name}
								</p>
								<p>
									<strong className="text-gray-400">Email:</strong>{" "}
									{selectedEmployee.email}
								</p>
								<p>
									<strong className="text-gray-400">Address:</strong>{" "}
									{selectedEmployee.address1},{" "}
									{selectedEmployee.address2 || "N/A"}
								</p>
								<p>
									<strong className="text-gray-400">City:</strong>{" "}
									{selectedEmployee.city}
								</p>
								<p>
									<strong className="text-gray-400">State:</strong>{" "}
									{selectedEmployee.state}
								</p>
								<p>
									<strong className="text-gray-400">ZIP:</strong>{" "}
									{selectedEmployee.zip}
								</p>
								<p>
									<strong className="text-gray-400">Phone:</strong>{" "}
									{selectedEmployee.phone}
								</p>
								<p>
									<strong className="text-gray-400">Position:</strong>{" "}
									{selectedEmployee.position}
								</p>
								<p>
									<strong className="text-gray-400">Team:</strong>{" "}
									{selectedEmployee.team}
								</p>
							</div>
						) : (
							<p className="text-gray-500">
								Select an employee to see details.
							</p>
						)}
					</div>
				</aside>

				{/* Cards Section */}
				<main className="col-span-2 flex flex-col gap-6">
					<h1 className="text-2xl font-bold text-gray-300">
						Form Dispatch Dashboard
					</h1>
					<Separator className="border-neutral-700" />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{formLinks.map((form) => (
							<Card
								key={form.id}
								className="shadow-lg bg-neutral-800 text-gray-300"
							>
								<CardHeader>
									<CardTitle>{form.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-400 mb-4">
										Choose an option below for the {form.title.toLowerCase()}.
									</p>
									<div className="flex gap-4">
										<Button
											onClick={() => router.push(form.url)}
											variant="default"
											className="w-full bg-neutral-700 hover:bg-neutral-600 text-white"
										>
											View Template
										</Button>
										<Button
											onClick={() => handlePrefillForm(form.id)}
											variant="primary"
											className="w-full bg-blue-500 hover:bg-blue-400 text-white"
										>
											View Prefilled
										</Button>
										<Button
											onClick={() => handlePrefillForm(form.id)}
											variant="primary"
											className="w-full bg-blue-500 hover:bg-blue-400 text-white"
										>
											Send SMS
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
