import type { Quiz } from "../types/quiz";
import { API_BASE_URL } from "./config";
import { authFetch } from "./authFetch";

//GET all quizzes
export async function getAllQuizzes(): Promise<Quiz[]> {
  const response = await authFetch(`${API_BASE_URL}/quizzes`);

  return response.json() as Promise<Quiz[]>;
}

//GET one quiz by id
export async function getQuizById(quizId: number): Promise<Quiz> {
  const response = await authFetch(`${API_BASE_URL}/quizzes/${quizId}`);

  return response.json() as Promise<Quiz>;
}

//POST create a new quiz
export async function createQuiz(quiz: Omit<Quiz, "id">): Promise<Quiz> {
  const response = await authFetch(`${API_BASE_URL}/quizzes`, {
    method: "POST",
    body: JSON.stringify(quiz),
  });

  return response.json() as Promise<Quiz>;
}

//PUT update an existing quiz
export async function updateQuiz(
  quizId: number,
  quiz: Pick<Quiz, "title" | "description">,
): Promise<Quiz> {
  const response = await authFetch(`${API_BASE_URL}/quizzes/${quizId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: quiz.title,
      description: quiz.description,
    }),
  });

  return response.json() as Promise<Quiz>;
}

//DELETE a quiz
export async function deleteQuiz(quizId: number): Promise<void> {
  await authFetch(`${API_BASE_URL}/quizzes/${quizId}`, {
    method: "DELETE",
  });
}
