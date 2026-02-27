import { EmployeesPage } from "./features/employees/presentation/pages/EmployeesPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="border-b border-gray-200 bg-white px-8 py-4 text-2xl font-bold text-gray-900">
        Employee Directory
      </h1>
      <EmployeesPage />
    </div>
  );
}

export default App;
