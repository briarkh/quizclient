import type { Score } from "../types/score";
import { API_BASE_URL } from "./config";

//GET past scores for a specific student

export async function getScoresByStudent(studentId: number): Promise<Score[]> {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/scores`);

  if (!response.ok) {
    throw new Error("Failed to fetch student scores");
  }

  return response.json() as Promise<Score[]>;
}

//GET scores for a specific quiz

export async function getScoresByQuiz(quizId: number): Promise<Score[]> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/scores`);

  if (!response.ok) {
    throw new Error("Failed to fetch quiz scores");
  }

  return response.json() as Promise<Score[]>;
}
