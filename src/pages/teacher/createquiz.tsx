import { useState } from "react";
import type {
  MultipleChoiceOption,
  QuestionType,
  QuizQuestion,
} from "../../types/quiz";

function CreateQuizPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const [questionType, setQuestionType] =
    useState<QuestionType>("multiple_choice");
  const [questionText, setQuestionText] = useState<string>("");

  const [optionA, setOptionA] = useState<string>("");
  const [optionB, setOptionB] = useState<string>("");
  const [optionC, setOptionC] = useState<string>("");
  const [optionD, setOptionD] = useState<string>("");
  const [correctOption, setCorrectOption] = useState<MultipleChoiceOption>("A");

  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  function resetQuestionForm() {
    setQuestionType("multiple_choice");
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectOption("A");
    setCorrectAnswer("");
  }

  function handleAddQuestion() {
    if (questionText.trim() === "") {
      return;
    }

    //fake ids \/ for now, this needs to be connected to the backend to get real ids
    const newQuestionId = questions.length + 1;

    if (questionType === "multiple_choice") {
      const newQuestion: QuizQuestion = {
        id: newQuestionId,
        quizId: 0,
        type: "multiple_choice",
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
      };

      setQuestions((currentQuestions) => [...currentQuestions, newQuestion]);
      resetQuestionForm();
      return;
    }

    const newQuestion: QuizQuestion = {
      id: newQuestionId,
      quizId: 0,
      type: "short_answer",
      questionText,
      correctAnswer,
    };

    setQuestions((currentQuestions) => [...currentQuestions, newQuestion]);
    resetQuestionForm();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newQuiz = {
      title,
      description,
      questions,
    };

    console.log(newQuiz);
  }

  return (
    <main>
      <h1>Create Quiz</h1>

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
          <label htmlFor="questionType">Question Type</label>
          <select
            id="questionType"
            value={questionType}
            onChange={(event) =>
              setQuestionType(event.target.value as QuestionType)
            }
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="short_answer">Short Answer</option>
          </select>
        </div>

        <div>
          <label htmlFor="questionText">Question Text</label>
          <input
            id="questionText"
            type="text"
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
          />
        </div>

        {questionType === "multiple_choice" && (
          <>
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
          </>
        )}

        {questionType === "short_answer" && (
          <div>
            <label htmlFor="correctAnswer">Correct Answer</label>
            <input
              id="correctAnswer"
              type="text"
              value={correctAnswer}
              onChange={(event) => setCorrectAnswer(event.target.value)}
            />
          </div>
        )}

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
              <p>Type: {question.type}</p>

              {question.type === "multiple_choice" && (
                <ul>
                  <li>A: {question.optionA}</li>
                  <li>B: {question.optionB}</li>
                  <li>C: {question.optionC}</li>
                  <li>D: {question.optionD}</li>
                  <li>Correct Answer: {question.correctOption}</li>
                </ul>
              )}

              {question.type === "short_answer" && (
                <p>Correct Answer: {question.correctAnswer}</p>
              )}
            </section>
          ))
        )}

        <button type="submit">Create Quiz</button>
      </form>
    </main>
  );
}

export default CreateQuizPage;
