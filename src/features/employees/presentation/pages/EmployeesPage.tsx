import { useState } from "react";
import { useGetEmployeesQuery, useGetDepartmentsQuery } from "../../data/employeesApi";
import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeeCreateForm } from "../components/EmployeeCreateForm";
import { Modal } from "../../../../shared/components/Modal";

interface Props {
  onEmployeeClick?: (id: number) => void;
}

export function EmployeesPage({ onEmployeeClick }: Props) {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();
  const { data: departments, isError: isDepartmentsError } = useGetDepartmentsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employees...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-red-500">
        Failed to load employees. Is the mock server running?
      </p>
    );
  }

  const filteredEmployees = (employees ?? [])
    .filter((e) =>
      selectedDepartment === "All" ? true : e.department === selectedDepartment,
    )
    .filter((e) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        e.firstName.toLowerCase().includes(q) ||
        e.lastName.toLowerCase().includes(q)
      );
    });

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Employees</h2>
        <div className="flex items-center gap-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Departments</option>
            {isDepartmentsError ? (
              <option disabled>Failed to load departments</option>
            ) : (
              departments?.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))
            )}
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            + Add Employee
          </button>
        </div>
      </div>
      <EmployeesTable employees={filteredEmployees} onRowClick={onEmployeeClick} />
      {isModalOpen && (
        <Modal title="New Employee" onClose={() => setIsModalOpen(false)}>
          <EmployeeCreateForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
