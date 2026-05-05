import type { MultipleChoiceOption, QuizQuestion } from "../types/quiz";

interface MultipleChoiceQuestionProps {
  question: QuizQuestion;
  questionNumber: number;
  selectedAnswer?: MultipleChoiceOption;
  onAnswerChange: (questionId: number, answer: MultipleChoiceOption) => void;
}

function MultipleChoiceQuestion({
  question,
  questionNumber,
  selectedAnswer,
  onAnswerChange,
}: MultipleChoiceQuestionProps) {
  return (
    <section>
      <h2>
        Question {questionNumber}: {question.questionText}
      </h2>

      {(["A", "B", "C", "D"] as const).map((option) => {
        const optionText =
          option === "A"
            ? question.optionA
            : option === "B"
              ? question.optionB
              : option === "C"
                ? question.optionC
                : question.optionD;

        return (
          <label key={option}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerChange(question.id, option)}
            />
            {option}. {optionText}
          </label>
        );
      })}
    </section>
  );
}

export default MultipleChoiceQuestion;
