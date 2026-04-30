export type QuestionType = "multiple_choice" | "short_answer";

export type MultipleChoiceOption = "A" | "B" | "C" | "D";

export interface MultipleChoiceQuestion {
  id: number;
  quizId: number;
  type: "multiple_choice";
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: MultipleChoiceOption;
}

export interface ShortAnswerQuestion {
  id: number;
  quizId: number;
  type: "short_answer";
  questionText: string;
  correctAnswer: string;
}

export type QuizQuestion = MultipleChoiceQuestion | ShortAnswerQuestion;

//change if needed
export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
}
