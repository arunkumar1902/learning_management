import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

import { useLMS } from "../context/LMSContext";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { courses, submitQuiz, quizResults } = useLMS();

  const course = courses.find(
    (item) => item.id === Number(id)
  );

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!course) {
    return <div className="empty-state">Course not found.</div>;
  }

  const questions = course.quiz || [];

  if (!questions.length) {
    return <div className="empty-state">No quiz available for this course.</div>;
  }

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    submitQuiz(course.id, score, questions.length);
    setSubmitted(true);
  };

  const retryQuiz = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>{course.title} - Assessment</h1>
        <p>Test your knowledge of this course.</p>

        <span>{questions.length} Questions</span>
      </div>

      {!submitted ? (
        <div className="quiz-container">
          {questions.map((question, index) => (
            <div className="quiz-question" key={index}>
              <h3>
                {index + 1}. {question.question}
              </h3>

              <div className="quiz-options">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`quiz-option ${
                      answers[index] === optionIndex ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={answers[index] === optionIndex}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [index]: optionIndex
                        }))
                      }
                    />

                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            className="btn-primary submit-quiz"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-result">
          {percentage >= 60 ? (
            <FiCheckCircle className="result-success" />
          ) : (
            <FiXCircle className="result-failure" />
          )}

          <h2>
            {percentage >= 60
              ? "Congratulations! You Passed"
              : "Keep Practicing!"}
          </h2>

          <div className="score-circle">
            <strong>{percentage}%</strong>
            <span>Your Score</span>
          </div>

          <p>
            You answered {score} out of {questions.length} questions correctly.
          </p>

          <div className="result-actions">
            <button
              className="btn-secondary"
              onClick={retryQuiz}
            >
              Retry Quiz
            </button>

            <button
              className="btn-primary"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              Back to Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;