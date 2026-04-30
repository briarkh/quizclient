export interface Score {
  id: number;
  quizId: number;
  studentId: number;
  quizTitle: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  takenAt: string;
}
