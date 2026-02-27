import { useGetEmployeesQuery } from "../../data/employeesApi";
import { EmployeesTable } from "../components/EmployeesTable";

export function EmployeesPage() {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();

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
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Employees</h2>
      <EmployeesTable employees={employees ?? []} />
    </div>
  );
}
