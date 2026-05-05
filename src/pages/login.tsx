import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { loginUser } from "../api/authApi";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("teacher@test.com");
  const [password, setPassword] = useState<string>("password123");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      login(response.user, response.token);

      if (response.user.role === "teacher") {
        navigate("/teacher/quizzes");
      } else {
        navigate("/student/quizzes");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Login failed.");
      }
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <p>Use your teacher or student account to log in.</p>

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>Teacher test login: teacher@test.com - password123</p>
      <p>Student test login: student@test.com - password123</p>
    </main>
  );
}

export default LoginPage;
