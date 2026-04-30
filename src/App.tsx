import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";

import TeacherQuizPage from "./pages/teacher/teacherquiz";
import CreateQuizPage from "./pages/teacher/createquiz";
import EditQuizPage from "./pages/teacher/editquiz";
import ScoresPage from "./pages/teacher/scores";
import AssignQuizPage from "./pages/teacher/assignquiz";

import StudentQuizPage from "./pages/student/studentquiz";
import TakeQuizPage from "./pages/student/takequiz";
import StudentScoresPage from "./pages/student/studscores";
import Navbar from "./components/navi";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/teacher/quizzes" element={<TeacherQuizPage />} />
        <Route path="/teacher/quizzes/create" element={<CreateQuizPage />} />
        <Route path="/teacher/quizzes/:id/edit" element={<EditQuizPage />} />
        <Route path="/teacher/quizzes/:id/scores" element={<ScoresPage />} />
        <Route path="/teacher/assign" element={<AssignQuizPage />} />

        <Route path="/student/quizzes" element={<StudentQuizPage />} />
        <Route path="/student/quizzes/:id/take" element={<TakeQuizPage />} />
        <Route path="/student/results" element={<StudentScoresPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
