export type UserRole = "student" | "teacher";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}
