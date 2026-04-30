import type { Quiz } from "../types/quiz";
import { API_BASE_URL } from "./config";

//GET all quizzes

export async function getAllQuizzes(): Promise<Quiz[]> {
  const response = await fetch(`${API_BASE_URL}/quizzes`); //change

  if (!response.ok) {
    throw new Error("Failed to fetch quizzes");
  }

  return response.json() as Promise<Quiz[]>;
}

//GET one quiz by id

export async function getQuizById(quizId: number): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch quiz");
  }

  return response.json() as Promise<Quiz>;
}

//POST create a new quiz

/* interface CreateQuizRequest {
  title: string;
  description: string;
} */

export async function createQuiz(quiz: Omit<Quiz, "id">): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });

  if (!response.ok) {
    throw new Error("Failed to create quiz");
  }

  return response.json() as Promise<Quiz>;
}

//PUT update an existing quiz
//PUT or PATCH
// PUT usually replaces/updates the whole quiz.
// PATCH usually updates only specific fields.
export async function updateQuiz(
  quizId: number,
  quiz: Omit<Quiz, "id">,
): Promise<Quiz> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });

  if (!response.ok) {
    throw new Error("Failed to update quiz");
  }

  return response.json() as Promise<Quiz>;
}

//DELETE a quiz

export async function deleteQuiz(quizId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete quiz");
  }
}

//GET quizzes assigned to a specific student
/*
export async function getAssignedQuizzesByStudent(
  studentId: number
): Promise<Quiz[]> {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/quizzes`);

  if (!response.ok) {
    throw new Error("Failed to fetch assigned quizzes");
  }

  return response.json() as Promise<Quiz[]>;
}
*/
