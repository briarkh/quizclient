import type { User } from "../types/user";
import { API_BASE_URL } from "./config";

// GET all users
// Ask your partner if this route exists.
// It may be GET /users or GET /api/users.
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json() as Promise<User[]>;
}

// GET all students
// This will be useful for the teacher assignment page.
// Ask your partner if they are making:
// GET /students
// or GET /users?role=student
// or GET /api/students
export async function getAllStudents(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/students`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json() as Promise<User[]>;
}

// GET one user by ID
// Ask your partner if the route is:
// GET /users/:userId
export async function getUserById(userId: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json() as Promise<User>;
}
