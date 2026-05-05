import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../../api/quizApi";
import type { MultipleChoiceOption, QuizQuestion } from "../../types/quiz";

function CreateQuizPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [questionText, setQuestionText] = useState<string>("");
  const [optionA, setOptionA] = useState<string>("");
  const [optionB, setOptionB] = useState<string>("");
  const [optionC, setOptionC] = useState<string>("");
  const [optionD, setOptionD] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<MultipleChoiceOption>("A");

  const [errorMessage, setErrorMessage] = useState<string>("");

  function resetQuestionForm() {
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOption("A");
  }

  function handleAddQuestion() {
    setErrorMessage("");

    if (questionText.trim() === "") {
      setErrorMessage("Question text is required.");
      return;
    }

    if (
      optionA.trim() === "" ||
      optionB.trim() === "" ||
      optionC.trim() === "" ||
      optionD.trim() === ""
    ) {
      setErrorMessage("All four answer options are required.");
      return;
    }

    const newQuestionId = questions.length + 1;

    const newQuestion: QuizQuestion = {
      id: newQuestionId,
      quizId: 0,
      type: "multiple_choice",
      questionText: questionText.trim(),
      optionA: optionA.trim(),
      optionB: optionB.trim(),
      optionC: optionC.trim(),
      optionD: optionD.trim(),
      correctOption,
    };

    setQuestions((currentQuestions) => [...currentQuestions, newQuestion]);
    resetQuestionForm();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (title.trim() === "") {
      setErrorMessage("Quiz title is required.");
      return;
    }

    if (questions.length === 0) {
      setErrorMessage("Please add at least one question.");
      return;
    }

    try {
      await createQuiz({
        title: title.trim(),
        description: description.trim(),
        questions,
      });

      navigate("/teacher/quizzes");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to create quiz.");
      }
    }
  }

  return (
    <main>
      <h1>Create Quiz</h1>

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

        <hr />

        <h2>Add Question</h2>

        <div>
          <label htmlFor="questionText">Question Text</label>
          <input
            id="questionText"
            type="text"
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="optionA">Option A</label>
          <input
            id="optionA"
            type="text"
            value={optionA}
            onChange={(event) => setOptionA(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="optionB">Option B</label>
          <input
            id="optionB"
            type="text"
            value={optionB}
            onChange={(event) => setOptionB(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="optionC">Option C</label>
          <input
            id="optionC"
            type="text"
            value={optionC}
            onChange={(event) => setOptionC(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="optionD">Option D</label>
          <input
            id="optionD"
            type="text"
            value={optionD}
            onChange={(event) => setOptionD(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="correctOption">Correct Option</label>
          <select
            id="correctOption"
            value={correctOption}
            onChange={(event) =>
              setCorrectOption(event.target.value as MultipleChoiceOption)
            }
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <hr />

        <h2>Questions Added</h2>

        {questions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          questions.map((question) => (
            <section key={question.id}>
              <h3>{question.questionText}</h3>
              <ul>
                <li>A: {question.optionA}</li>
                <li>B: {question.optionB}</li>
                <li>C: {question.optionC}</li>
                <li>D: {question.optionD}</li>
                <li>Correct Answer: {question.correctOption}</li>
              </ul>
            </section>
          ))
        )}

        <button type="submit">Create Quiz</button>
      </form>
    </main>
  );
}

export default CreateQuizPage;
