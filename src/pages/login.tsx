import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import type { User } from "../types/user";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleTeacherLogin() {
    const teacher: User = {
      id: 1,
      name: "Teacher User",
      role: "teacher",
    };

    login(teacher);
    navigate("/teacher/quizzes");
  }

  function handleStudentLogin() {
    const student: User = {
      id: 2,
      name: "Student User",
      role: "student",
    };

    login(student);
    navigate("/student/quizzes");
  }

  return (
    <main>
      <h1>Login</h1>
      <p>Choose which type of user you want to test as.</p>

      <button onClick={handleTeacherLogin}>Login as Teacher</button>
      <button onClick={handleStudentLogin}>Login as Student</button>
    </main>
  );
}

export default LoginPage;
