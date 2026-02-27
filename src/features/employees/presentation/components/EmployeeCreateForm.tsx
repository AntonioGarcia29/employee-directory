import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddEmployeeMutation } from "../../data/employeesApi";
import { useGetDepartmentsQuery } from "../../data/employeesApi";

const schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  status: z.enum(["active", "inactive"]),
});

type EmployeeCreateFormValues = z.infer<typeof schema>;

const INPUT_CLASS =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none";

interface Props {
  onSuccess?: () => void;
}

export function EmployeeCreateForm({ onSuccess }: Props) {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const { data: departments = [], isLoading: isDepartmentsLoading } =
    useGetDepartmentsQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeCreateFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: "active" },
  });

  const onSubmit = async (values: EmployeeCreateFormValues) => {
    await addEmployee(values).unwrap();
    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input {...register("firstName")} className={INPUT_CLASS} />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input {...register("lastName")} className={INPUT_CLASS} />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.lastName.message}
            </p>
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
        <label className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <input {...register("position")} className={INPUT_CLASS} />
        {errors.position && (
          <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            {...register("department")}
            className={INPUT_CLASS}
            disabled={isDepartmentsLoading}
          >
            <option value="">Select department...</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1 text-xs text-red-500">
              {errors.department.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select {...register("status")} className={INPUT_CLASS}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input {...register("startDate")} type="date" className={INPUT_CLASS} />
        {errors.startDate && (
          <p className="mt-1 text-xs text-red-500">{errors.startDate.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Employee"}
        </button>
      </div>
    </form>
  );
}
