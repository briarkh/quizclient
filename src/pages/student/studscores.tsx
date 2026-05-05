import { useEffect, useState } from "react";
import { getScoresByStudent } from "../../api/scoreApi";
import { useAuth } from "../../context/authcontext";
import type { Score } from "../../types/score";

function StudentResultsPage() {
  const { currentUser } = useAuth();

  const [scores, setScores] = useState<Score[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadScores() {
      if (!currentUser) {
        setErrorMessage("You must be logged in to view your scores.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getScoresByStudent(currentUser.id);
        setScores(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Failed to load scores.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadScores();
  }, [currentUser]);

  return (
    <main>
      <h1>My Past Scores</h1>
      <p>View your previous quiz attempts.</p>

      {isLoading && <p>Loading scores</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && scores.length === 0 && (
        <p>You have not submitted any quizzes yet.</p>
      )}

      {scores.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Quiz</th>
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
                  <td>{score.quizTitle}</td>
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
      )}
    </main>
  );
}

export default StudentResultsPage;
