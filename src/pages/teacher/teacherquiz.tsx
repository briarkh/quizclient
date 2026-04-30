import { Link } from "react-router-dom";
import { mockQuizzes } from "../../api/mockdata";

function TeacherQuizPage() {
  return (
    <main>
      <h1>Teacher Quizzes</h1>
      <p>View, edit, delete, or check scores for existing quizzes.</p>

      {mockQuizzes.map((quiz) => (
        <section key={quiz.id}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <p>Questions: {quiz.questions.length}</p>

          <Link to={`/teacher/quizzes/${quiz.id}/edit`}>Edit</Link>
          {" | "}
          <Link to={`/teacher/quizzes/${quiz.id}/scores`}>View Scores</Link>
          {" | "}
          <button type="button">Delete</button>
        </section>
      ))}
    </main>
  );
}

export default TeacherQuizPage;
