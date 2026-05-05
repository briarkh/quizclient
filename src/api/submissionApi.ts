import type { Score } from "../types/score";
import type { MultipleChoiceOption } from "../types/quiz";
import { API_BASE_URL } from "./config";
import { authFetch } from "./authFetch";

export interface QuizAnswer {
  questionId: number;
  answer: MultipleChoiceOption;
}

export interface QuizSubmission {
  studentId: number;
  quizId: number;
  answers: QuizAnswer[];
}

//POST submit quiz answers

export async function submitQuiz(submission: QuizSubmission): Promise<Score> {
  const response = await authFetch(
    `${API_BASE_URL}/students/${submission.studentId}/quizzes/${submission.quizId}/submit`,
    {
      method: "POST",
      body: JSON.stringify({
        answers: submission.answers,
      }),
    },
  );

  return response.json() as Promise<Score>;
}
