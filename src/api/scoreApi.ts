import type { Score } from "../types/score";
import { API_BASE_URL } from "./config";
import { authFetch } from "./authFetch";

//GET past scores for a specific student
export async function getScoresByStudent(studentId: number): Promise<Score[]> {
  const response = await authFetch(
    `${API_BASE_URL}/students/${studentId}/scores`,
  );

  return response.json() as Promise<Score[]>;
}

//GET scores for a specific quiz
export async function getScoresByQuiz(quizId: number): Promise<Score[]> {
  const response = await authFetch(`${API_BASE_URL}/quizzes/${quizId}/scores`);

  return response.json() as Promise<Score[]>;
}
