import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuizById, updateQuiz } from "../../api/quizApi";

function EditQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const quizId = Number(id);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    async function loadQuiz() {
      if (!quizId) {
        setErrorMessage("Invalid quiz ID.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const quiz = await getQuizById(quizId);

        setTitle(quiz.title);
        setDescription(quiz.description ?? "");
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Failed to load quiz.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadQuiz();
  }, [quizId]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.trim() === "") {
      setErrorMessage("Quiz title is required.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      await updateQuiz(quizId, {
        title: title.trim(),
        description: description.trim(),
      });

      navigate("/teacher/quizzes");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to update quiz.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <main>
        <h1>Edit Quiz</h1>
        <p>Loading quiz...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Edit Quiz</h1>

      <Link to="/teacher/quizzes">Back to Teacher Quizzes</Link>

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Quiz Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Quiz Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}

export default EditQuizPage;
