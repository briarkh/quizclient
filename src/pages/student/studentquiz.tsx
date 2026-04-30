import { Link } from "react-router-dom";
import { mockQuizzes } from "../../api/mockdata";

function StudentQuizPage() {
  return (
    <main>
      <h1>My Assigned Quizzes</h1>
      <p>These are the quizzes currently assigned to you.</p>

      {mockQuizzes.map((quiz) => (
        <section key={quiz.id}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <p>Questions: {quiz.questions.length}</p>

          <Link to={`/student/quizzes/${quiz.id}/take`}>Take Quiz</Link>
        </section>
      ))}
    </main>
  );
}

export default StudentQuizPage;
