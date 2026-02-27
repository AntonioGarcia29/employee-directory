import { useGetEmployeeByIdQuery } from "../../data/employeeDetailApi";
import { EmployeeDetailTable } from "../components/EmployeeDetailTable";

interface Props {
  employeeId: number;
  onEdit: () => void;
  onBack: () => void;
}

export function EmployeeDetailPage({ employeeId, onEdit, onBack }: Props) {
  const { data: employee, isLoading, isError } = useGetEmployeeByIdQuery(employeeId);

  if (isLoading) {
    return <p className="p-8 text-gray-500">Loading employee...</p>;
  }

  if (isError || !employee) {
    return (
      <p className="p-8 text-red-500">
        Failed to load employee. Is the mock server running?
      </p>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {employee.firstName} {employee.lastName}
          </h2>
        </div>
        <button
          onClick={onEdit}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
        >
          Edit
        </button>
      </div>
      <EmployeeDetailTable employee={employee} />
    </div>
  );
}
