import type { Quiz } from "../types/quiz";
import type { Score } from "../types/score";

export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    title: "HTML Basics",
    description: "A short quiz about basic HTML concepts.",
    questions: [
      {
        id: 1,
        quizId: 1,
        type: "multiple_choice",
        questionText: "What does HTML stand for?",
        optionA: "Hyper Text Markup Language",
        optionB: "High Tech Modern Language",
        optionC: "Home Tool Markup Language",
        optionD: "Hyperlink Text Machine Language",
        correctOption: "A",
      },
      {
        id: 2,
        quizId: 1,
        type: "short_answer",
        questionText: "What tag is used to create a paragraph?",
        correctAnswer: "p",
      },
    ],
  },
  {
    id: 2,
    title: "CSS Basics",
    description: "A short quiz about basic CSS concepts.",
    questions: [
      {
        id: 3,
        quizId: 2,
        type: "multiple_choice",
        questionText: "Which property changes the text color?",
        optionA: "font-style",
        optionB: "text-color",
        optionC: "color",
        optionD: "background-color",
        correctOption: "C",
      },
    ],
  },
];

export const mockScores: Score[] = [
  {
    id: 1,
    quizId: 1,
    studentId: 2,
    quizTitle: "HTML Basics",
    studentName: "Student User",
    score: 2,
    totalQuestions: 2,
    takenAt: "2026-04-29",
  },
  {
    id: 2,
    quizId: 2,
    studentId: 2,
    quizTitle: "CSS Basics",
    studentName: "Student User",
    score: 1,
    totalQuestions: 1,
    takenAt: "2026-04-29",
  },
];
