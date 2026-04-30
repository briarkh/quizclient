import type { Score } from "../types/score";
import { API_BASE_URL } from "./config";

export interface QuizAnswer {
  questionId: number;
  answer: string;
}

export interface QuizSubmission {
  studentId: number;
  quizId: number;
  answers: QuizAnswer[];
}

// POST submit quiz answers

// Possible routes:
// POST /students/:studentId/quizzes/:quizId/submit
// POST /quizzes/:quizId/submit
// POST /submissions

export async function submitQuiz(submission: QuizSubmission): Promise<Score> {
  const response = await fetch(
    `${API_BASE_URL}/students/${submission.studentId}/quizzes/${submission.quizId}/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: submission.answers,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to submit quiz");
  }

  return response.json() as Promise<Score>;
}
