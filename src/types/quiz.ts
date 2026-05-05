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

export type QuizQuestion = MultipleChoiceQuestion;

export interface Quiz {
  id: number;
  title: string;
  description: string | null;
  questions: QuizQuestion[];
}
