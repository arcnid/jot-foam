"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogHeader,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DataManagement() {
	const [employees, setEmployees] = useState([]); // Stores employee data
	const [loading, setLoading] = useState(true); // Loading state for data fetching
	const [error, setError] = useState(null); // Error message state
	const [editEmployee, setEditEmployee] = useState(null); // Tracks if editing an employee
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		position: "",
	}); // Form data state

	// Fetch employees from API
	const fetchEmployees = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/employees");
			if (response.ok) {
				const data = await response.json();
				console.log("data", data);
				setEmployees(data.data);
			} else {
				setError("Failed to fetch employees.");
			}
		} catch {
			setError("An error occurred while fetching employees.");
		} finally {
			setLoading(false);
		}
	};

	// Save employee (add or edit)
	const handleSave = async () => {
		const method = editEmployee ? "PUT" : "POST";
		const url = editEmployee
			? `/api/employees/${editEmployee.id}`
			: "/api/employees";

		try {
			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (response.ok) {
				fetchEmployees();
				setEditEmployee(null);
				setForm({ first_name: "", last_name: "", email: "", position: "" });
			} else {
				alert("Failed to save employee.");
			}
		} catch {
			alert("An error occurred while saving employee.");
		}
	};

	// Delete employee
	const handleDelete = async (id) => {
		try {
			const response = await fetch(`/api/employees/${id}`, {
				method: "DELETE",
			});
			if (response.ok) fetchEmployees();
			else alert("Failed to delete employee.");
		} catch {
			alert("An error occurred while deleting employee.");
		}
	};

	// Initial data fetch
	useEffect(() => {
		fetchEmployees();
	}, []);

	return (
		<div className="min-h-screen p-8 bg-neutral-900 text-white">
			{/* Breadcrumbs */}
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
						<BreadcrumbSeparator />
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbPage>Data Management</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Page Header */}
			<h1 className="text-3xl font-bold mb-6">Data Management</h1>
			<Separator className="mb-6 border-neutral-700" />

			{/* Error Message */}
			{error && <p className="text-red-500 mb-4">{error}</p>}

			{/* Employee Table Section */}
			<div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
				{/* Table Header */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Employee List</h2>
					{/* Add Employee Button */}
					<Dialog>
						<DialogTrigger asChild>
							<Button onClick={() => setEditEmployee(null)}>
								Add Employee
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									{editEmployee ? "Edit Employee" : "Add Employee"}
								</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								{/* Employee Form */}
								<Input
									placeholder="First Name"
									value={form.first_name}
									onChange={(e) =>
										setForm({ ...form, first_name: e.target.value })
									}
								/>
								<Input
									placeholder="Last Name"
									value={form.last_name}
									onChange={(e) =>
										setForm({ ...form, last_name: e.target.value })
									}
								/>
								<Input
									placeholder="Email"
									value={form.email}
									onChange={(e) => setForm({ ...form, email: e.target.value })}
								/>
								<Input
									placeholder="Position"
									value={form.position}
									onChange={(e) =>
										setForm({ ...form, position: e.target.value })
									}
								/>
								<DialogFooter>
									<Button onClick={handleSave}>
										{editEmployee ? "Save Changes" : "Add Employee"}
									</Button>
								</DialogFooter>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				{/* Employee Table */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Position</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell colSpan="5" className="text-center">
									Loading...
								</TableCell>
							</TableRow>
						) : employees.length > 0 ? (
							employees.map((employee) => (
								<TableRow key={employee.id}>
									<TableCell>{employee.first_name}</TableCell>
									<TableCell>{employee.last_name}</TableCell>
									<TableCell>{employee.email}</TableCell>
									<TableCell>{employee.position}</TableCell>
									<TableCell>
										<div className="flex gap-2">
											<Button
												variant="outline"
												onClick={() => {
													setEditEmployee(employee);
													setForm(employee);
												}}
											>
												Edit
											</Button>
											<Button
												variant="destructive"
												onClick={() => handleDelete(employee.id)}
											>
												Delete
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan="5" className="text-center">
									No employees found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
