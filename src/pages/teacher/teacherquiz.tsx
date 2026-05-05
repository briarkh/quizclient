import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Quiz } from "../../types/quiz";
import { deleteQuiz, getAllQuizzes } from "../../api/quizApi";

function TeacherQuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadQuizzes() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Failed to load quizzes.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadQuizzes();
  }, []);

  async function handleDeleteQuiz(quizId: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setErrorMessage("");

      await deleteQuiz(quizId);

      setQuizzes((currentQuizzes) =>
        currentQuizzes.filter((quiz) => quiz.id !== quizId),
      );
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to delete quiz.");
      }
    }
  }

  return (
    <main>
      <h1>Teacher Quizzes</h1>
      <p>View, edit, delete, or check scores for existing quizzes</p>

      <Link to="/teacher/quizzes/create">Create New Quiz</Link>

      {isLoading && <p>Loading quizzes...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && quizzes.length === 0 && <p>No quizzes found.</p>}

      {quizzes.map((quiz) => (
        <section key={quiz.id}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <p>Questions: {quiz.questions.length}</p>

          <Link to={`/teacher/quizzes/${quiz.id}/edit`}>Edit</Link>
          {" | "}
          <Link to={`/teacher/quizzes/${quiz.id}/scores`}>View Scores</Link>
          {" | "}
          <button type="button" onClick={() => void handleDeleteQuiz(quiz.id)}>
            Delete
          </button>
        </section>
      ))}
    </main>
  );
}

export default TeacherQuizPage;
