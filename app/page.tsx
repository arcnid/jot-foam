"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const employees = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Daisy Ridley",
  ];
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const formLinks = [
    { title: "Onboarding Form", url: "/forms/onboarding" },
    { title: "Performance Review", url: "/forms/performance-review" },
    { title: "Exit Interview", url: "/forms/exit-interview" },
  ];

  const handleFormNavigation = (url) => {
    if (selectedEmployee) {
      // Example of how to dynamically append the selected employee
      const query = `?employee=${encodeURIComponent(selectedEmployee)}`;
      window.location.href = `${url}${query}`;
    } else {
      alert("Please select an employee first.");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8 min-h-screen p-8 bg-gradient-to-br from-gray-100 via-white to-gray-200 font-sans">
      {/* Employee List */}
      <aside className="col-span-1 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Employees</h2>
        <ul className="space-y-2">
          {employees.map((employee, index) => (
            <li
              key={index}
              className={`p-2 rounded cursor-pointer transition-all ${
                selectedEmployee === employee
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedEmployee(employee)}
            >
              {employee}
            </li>
          ))}
        </ul>
      </aside>

      {/* Cards Section */}
      <main className="col-span-2 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formLinks.map((form, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Navigate to the {form.title.toLowerCase()} for the selected
                  employee.
                </p>
                <Button
                  onClick={() => handleFormNavigation(form.url)}
                  variant="default"
                  className="w-full"
                >
                  Go to Form
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
