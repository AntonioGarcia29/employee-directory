import { useState } from "react";
import { useGetEmployeesQuery } from "../../data/employeesApi";
import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeeCreateForm } from "../components/EmployeeCreateForm";
import { Modal } from "../../../../shared/components/Modal";

interface Props {
  onEmployeeClick?: (id: number) => void;
}

export function EmployeesPage({ onEmployeeClick }: Props) {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Employees</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          + Add Employee
        </button>
      </div>
      <EmployeesTable employees={employees ?? []} onRowClick={onEmployeeClick} />
      {isModalOpen && (
        <Modal title="New Employee" onClose={() => setIsModalOpen(false)}>
          <EmployeeCreateForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
