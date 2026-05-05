import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudentAssignments } from "../../api/assignmentApi";
import { useAuth } from "../../context/authcontext";
import type { QuizAssignment } from "../../api/assignmentApi";

function StudentQuizPage() {
  const { currentUser } = useAuth();

  const [assignments, setAssignments] = useState<QuizAssignment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAssignments() {
      if (!currentUser) {
        setErrorMessage("You must be logged in to view assigned quizzes.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getStudentAssignments(currentUser.id);
        setAssignments(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("failed to load quiz");
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadAssignments();
  }, [currentUser]);

  return (
    <main>
      <h1>My Assigned Quizzes</h1>
      <p>These are the quizzes currently assigned to you.</p>

      {isLoading && <p>Loading assigned quizzes...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!isLoading && assignments.length === 0 && (
        <p>You do not have any assigned quizzes yet.</p>
      )}

      {assignments.map((assignment) => (
        <section key={assignment.id}>
          <h2>{assignment.quizTitle}</h2>
          <p>Assigned on: {assignment.assignedAt}</p>

          <Link to={`/student/quizzes/${assignment.quizId}/take`}>
            Take Quiz
          </Link>
        </section>
      ))}
    </main>
  );
}

export default StudentQuizPage;
