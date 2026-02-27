import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { EmployeeDetail, Department } from "../../domain/employee-detail.types";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  status: z.enum(["active", "inactive"]),
});

export type EmployeeDetailFormValues = z.infer<typeof schema>;

const INPUT_CLASS =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none";

interface Props {
  employee: EmployeeDetail;
  departments: Department[];
  onSubmit: (values: EmployeeDetailFormValues) => void | Promise<void>;
  isSubmitting: boolean;
}

export function EmployeeDetailForm({ employee, departments, onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeDetailFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      startDate: employee.startDate,
      status: employee.status,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input {...register("firstName")} className={INPUT_CLASS} />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input {...register("lastName")} className={INPUT_CLASS} />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input {...register("email")} type="email" className={INPUT_CLASS} />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <input {...register("position")} className={INPUT_CLASS} />
        {errors.position && (
          <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select {...register("department")} className={INPUT_CLASS}>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select {...register("status")} className={INPUT_CLASS}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input {...register("startDate")} type="date" className={INPUT_CLASS} />
        {errors.startDate && (
          <p className="mt-1 text-xs text-red-500">{errors.startDate.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
