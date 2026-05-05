import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/login">Login</Link>
      {currentUser?.role === "teacher" && (
        <>
          {" | "}
          <Link to="/teacher/quizzes">Teacher Quizzes</Link>
          {" | "}
          <Link to="/teacher/quizzes/create">Create Quiz</Link>
          {" | "}
          <Link to="/teacher/assign">Assign Quiz</Link>
        </>
      )}
      {currentUser?.role === "student" && (
        <>
          {" | "}
          <Link to="/student/quizzes">Student Quizzes</Link>
          {" | "}
          <Link to="/student/results">Student Results</Link>
        </>
      )}
      {currentUser && (
        <>
          {" | "}
          <span>Logged in as {currentUser.name}</span>
          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
