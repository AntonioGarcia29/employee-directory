import { useState } from "react";
import { EmployeesPage } from "./features/employees/presentation/pages/EmployeesPage";
import { EmployeeDetailPage } from "./features/employee-detail/presentation/pages/EmployeeDetailPage";
import { EmployeeDetailEditPage } from "./features/employee-detail/presentation/pages/EmployeeDetailEditPage";

type View =
  | { name: "list" }
  | { name: "detail"; id: number }
  | { name: "edit"; id: number };

function App() {
  const [view, setView] = useState<View>({ name: "list" });

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="border-b border-gray-200 bg-white px-8 py-4 text-2xl font-bold text-gray-900">
        Employee Directory
      </h1>

      {view.name === "list" && (
        <EmployeesPage onEmployeeClick={(id) => setView({ name: "detail", id })} />
      )}

      {view.name === "detail" && (
        <EmployeeDetailPage
          employeeId={view.id}
          onEdit={() => setView({ name: "edit", id: view.id })}
          onBack={() => setView({ name: "list" })}
        />
      )}

      {view.name === "edit" && (
        <EmployeeDetailEditPage
          employeeId={view.id}
          onSaved={() => setView({ name: "detail", id: view.id })}
          onCancel={() => setView({ name: "detail", id: view.id })}
        />
      )}
    </div>
  );
}

export default App;
