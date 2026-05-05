import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getScoresByQuiz } from "../../api/scoreApi";
import type { Score } from "../../types/score";

function QuizScoresPage() {
  const { id } = useParams();

  const quizId = Number(id);

  const [scores, setScores] = useState<Score[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadScores() {
      if (!quizId) {
        setErrorMessage("Invalid quiz ID.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getScoresByQuiz(quizId);
        setScores(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Failed to load quiz scores.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadScores();
  }, [quizId]);

  return (
    <main>
      <h1>Quiz Scores</h1>

      <Link to="/teacher/quizzes">Back to Teacher Quizzes</Link>

      {isLoading && <p>Loading scores...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && scores.length === 0 && (
        <p>No students have submitted this quiz yet.</p>
      )}

      {scores.length > 0 && (
        <>
          <h2>{scores[0].quizTitle}</h2>

          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Date Taken</th>
              </tr>
            </thead>

            <tbody>
              {scores.map((score) => {
                const percentage = Math.round(
                  (score.score / score.totalQuestions) * 100,
                );

                return (
                  <tr key={score.id}>
                    <td>{score.studentName}</td>
                    <td>
                      {score.score} / {score.totalQuestions}
                    </td>
                    <td>{percentage}%</td>
                    <td>{score.takenAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}

export default QuizScoresPage;
