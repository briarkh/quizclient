export type UserRole = "student" | "teacher"; //change if needed

export interface User {
  id: number;
  name: string;
  role: UserRole;
}
