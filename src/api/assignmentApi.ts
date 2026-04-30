import { API_BASE_URL } from "./config";

export interface QuizAssignment {
  id: number;
  quizId: number;
  studentId: number;
}

//POST assign a quiz to a student

//POST /quizzes/:quizId/assign /quizzes/${quizId}/assign
///students/:studentId/quizzes /students/${studentId}/quizzes

export async function assignQuizToStudent(
  quizId: number,
  studentId: number,
): Promise<QuizAssignment> {
  const response = await fetch(`${API_BASE_URL}/assignments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quizId,
      studentId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to assign quiz");
  }

  return response.json() as Promise<QuizAssignment>;
}
