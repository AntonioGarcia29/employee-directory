import type { ReactNode } from "react";
import type { EmployeeDetail } from "../../domain/employee-detail.types";

interface Props {
  employee: EmployeeDetail;
}

const STATUS_STYLES = {
  active:
    "inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700",
  inactive:
    "inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700",
} as const;

const DOT_STYLES = {
  active: "size-1.5 rounded-full bg-green-500",
  inactive: "size-1.5 rounded-full bg-red-500",
} as const;

export function EmployeeDetailTable({ employee }: Props) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: "First Name", value: employee.firstName },
    { label: "Last Name", value: employee.lastName },
    { label: "Email", value: employee.email },
    { label: "Position", value: employee.position },
    { label: "Department", value: employee.department },
    {
      label: "Start Date",
      value: new Date(employee.startDate).toLocaleDateString(),
    },
    {
      label: "Status",
      value: (
        <span className={STATUS_STYLES[employee.status]}>
          <span className={DOT_STYLES[employee.status]} />
          {employee.status}
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          {rows.map(({ label, value }) => (
            <tr key={label}>
              <td className="w-40 bg-gray-50 px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                {label}
              </td>
              <td className="px-6 py-3 text-sm text-gray-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
