import { API_BASE_URL } from "./config";
import { authFetch } from "./authFetch";

export interface QuizAssignment {
  id: number;
  studentId: number;
  quizId: number;
  quizTitle: string;
  studentName: string;
  assignedAt: string;
}

export async function assignQuizToStudent(
  quizId: number,
  studentId: number,
): Promise<QuizAssignment> {
  const response = await authFetch(`${API_BASE_URL}/assignments`, {
    method: "POST",
    body: JSON.stringify({
      quizId,
      studentId,
    }),
  });

  return response.json() as Promise<QuizAssignment>;
}

//GET quizzes assigned to a student
export async function getStudentAssignments(
  studentId: number,
): Promise<QuizAssignment[]> {
  const response = await authFetch(
    `${API_BASE_URL}/students/${studentId}/assignments`,
  );

  return response.json() as Promise<QuizAssignment[]>;
}
