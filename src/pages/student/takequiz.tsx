import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuizById } from "../../api/quizApi";
import { submitQuiz } from "../../api/submissionApi";
import { useAuth } from "../../context/authcontext";
import type { MultipleChoiceOption, Quiz } from "../../types/quiz";
import type { Score } from "../../types/score";

type AnswerMap = Record<number, MultipleChoiceOption>;

function TakeQuizPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const quizId = Number(id);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [result, setResult] = useState<Score | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    async function loadQuiz() {
      if (!currentUser) {
        setErrorMessage("You must be logged in to take a quiz.");
        setIsLoading(false);
        return;
      }

      if (!quizId) {
        setErrorMessage("Invalid quiz ID.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getQuizById(quizId);
        setQuiz(data);
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
  }, [currentUser, quizId]);

  function handleAnswerChange(
    questionId: number,
    answer: MultipleChoiceOption,
  ) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentUser) {
      setErrorMessage("You must be logged in to submit a quiz.");
      return;
    }

    if (!quiz) {
      setErrorMessage("Quiz is not loaded.");
      return;
    }

    if (quiz.questions.length === 0) {
      setErrorMessage("no questions");
      return;
    }

    const unansweredQuestion = quiz.questions.find(
      (question) => answers[question.id] === undefined,
    );

    if (unansweredQuestion) {
      setErrorMessage("Please answer every question before submitting.");
      return;
    }

    const submittedAnswers = quiz.questions.map((question) => ({
      questionId: question.id,
      answer: answers[question.id],
    }));

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const score = await submitQuiz({
        studentId: currentUser.id,
        quizId: quiz.id,
        answers: submittedAnswers,
      });

      setResult(score);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to submit");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main>
        <h1>Take Quiz</h1>
        <p>Loading quiz</p>
      </main>
    );
  }

  if (errorMessage && !quiz) {
    return (
      <main>
        <h1>Take Quiz</h1>
        <p>{errorMessage}</p>
        <Link to="/student/quizzes">Back to Assigned Quizzes</Link>
      </main>
    );
  }

  if (!quiz) {
    return (
      <main>
        <h1>Take Quiz</h1>
        <p>Quiz not found.</p>
        <Link to="/student/quizzes">Back to Assigned Quizzes</Link>
      </main>
    );
  }

  if (result) {
    return (
      <main>
        <h1>Quiz Submitted</h1>
        <h2>{result.quizTitle}</h2>
        <p>
          Score: {result.score} / {result.totalQuestions}
        </p>
        <p>Taken at: {result.takenAt}</p>

        <Link to="/student/quizzes">Back to Assigned Quizzes</Link>
        {" | "}
        <Link to="/student/results">View Past Scores</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <section key={question.id}>
            <h2>
              Question {index + 1}: {question.questionText}
            </h2>

            {(["A", "B", "C", "D"] as const).map((option) => {
              const optionText =
                option === "A"
                  ? question.optionA
                  : option === "B"
                    ? question.optionB
                    : option === "C"
                      ? question.optionC
                      : question.optionD;

              return (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleAnswerChange(question.id, option)}
                  />
                  {option}. {optionText}
                </label>
              );
            })}
          </section>
        ))}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </form>
    </main>
  );
}

export default TakeQuizPage;
