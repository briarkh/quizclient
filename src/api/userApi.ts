import type { User } from "../types/user";
import { API_BASE_URL } from "./config";
import { authFetch } from "./authFetch";

//GET all students teacher only
export async function getAllStudents(): Promise<User[]> {
  const response = await authFetch(`${API_BASE_URL}/students`);

  return response.json() as Promise<User[]>;
}
