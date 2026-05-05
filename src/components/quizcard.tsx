import { Link } from "react-router-dom";
import type { Quiz } from "../types/quiz";

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (quizId: number) => void;
}

function QuizCard({ quiz, onDelete }: QuizCardProps) {
  return (
    <section>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <p>Questions: {quiz.questions.length}</p>

      <Link to={`/teacher/quizzes/${quiz.id}/edit`}>Edit</Link>
      {" | "}
      <Link to={`/teacher/quizzes/${quiz.id}/scores`}>View Scores</Link>
      {" | "}
      <button type="button" onClick={() => onDelete(quiz.id)}>
        Delete
      </button>
    </section>
  );
}

export default QuizCard;
