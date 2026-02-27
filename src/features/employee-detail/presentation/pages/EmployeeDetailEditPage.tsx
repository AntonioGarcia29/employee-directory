import { useGetEmployeeByIdQuery, useGetDepartmentsQuery, useUpdateEmployeeMutation } from "../../data/employeeDetailApi";
import { EmployeeDetailForm } from "../components/EmployeeDetailForm";
import type { EmployeeDetailFormValues } from "../components/EmployeeDetailForm";

interface Props {
  employeeId: number;
  onSaved: () => void;
  onCancel: () => void;
}

export function EmployeeDetailEditPage({ employeeId, onSaved, onCancel }: Props) {
  const { data: employee, isLoading: isLoadingEmployee } = useGetEmployeeByIdQuery(employeeId);
  const { data: departments = [], isLoading: isLoadingDepartments } = useGetDepartmentsQuery();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  if (isLoadingEmployee || isLoadingDepartments) {
    return <p className="p-8 text-gray-500">Loading...</p>;
  }

  if (!employee) {
    return <p className="p-8 text-red-500">Employee not found.</p>;
  }

  async function handleSubmit(values: EmployeeDetailFormValues) {
    await updateEmployee({ ...values, id: employeeId }).unwrap();
    onSaved();
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Edit Employee</h2>
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
      <div className="max-w-2xl">
        <EmployeeDetailForm
          employee={employee}
          departments={departments}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
}
