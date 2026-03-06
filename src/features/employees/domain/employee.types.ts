export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  status: "active" | "inactive";
  phone?: string;
}

export interface Department {
  id: number;
  name: string;
}
