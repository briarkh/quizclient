import { useEffect, useState } from "react";
import { assignQuizToStudent } from "../../api/assignmentApi";
import { getAllQuizzes } from "../../api/quizApi";
import { getAllStudents } from "../../api/userApi";
import type { Quiz } from "../../types/quiz";
import type { User } from "../../types/user";

function AssignQuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [students, setStudents] = useState<User[]>([]);

  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const quizData = await getAllQuizzes();
        const studentData = await getAllStudents();

        setQuizzes(quizData);
        setStudents(studentData);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Failed to load assignment data.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, []);

  async function handleAssignQuiz(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const quizId = Number(selectedQuizId);
    const studentId = Number(selectedStudentId);

    if (!quizId || !studentId) {
      setErrorMessage("Please select both a quiz and a student.");
      return;
    }

    try {
      const assignment = await assignQuizToStudent(quizId, studentId);

      setMessage(
        `${assignment.quizTitle} was assigned to ${assignment.studentName}.`,
      );

      setSelectedQuizId("");
      setSelectedStudentId("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to assign quiz.");
      }
    }
  }

  return (
    <main>
      <h1>Assign Quiz</h1>
      <p>Select a quiz and assign it to an existing student.</p>

      {isLoading && <p>Loading...</p>}

      {errorMessage && <p>{errorMessage}</p>}
      {message && <p>{message}</p>}

      {!isLoading && (
        <form onSubmit={handleAssignQuiz}>
          <div>
            <label htmlFor="quiz">Quiz</label>
            <select
              id="quiz"
              value={selectedQuizId}
              onChange={(event) => setSelectedQuizId(event.target.value)}
            >
              <option value="">Select a quiz</option>

              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="student">Student</label>
            <select
              id="student"
              value={selectedStudentId}
              onChange={(event) => setSelectedStudentId(event.target.value)}
            >
              <option value="">Select a student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Assign Quiz</button>
        </form>
      )}
    </main>
  );
}

export default AssignQuizPage;
