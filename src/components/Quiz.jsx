import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/questions");
      setQuestions(response.data);
      setAnswers(new Array(response.data.length).fill(null));
    } catch (err) {
      setError("Failed to fetch questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/answers", {
        answers,
      });
      navigate("/results", { state: { results: response.data } });
    } catch (err) {
      setError("Failed to submit answers. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-3 flex flex-col justify-center items-center ">
      <div className="bg-white rounded-lg shadow-md p-4 text-gray-900 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">
          {question.question}
        </h2>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={classNames(
                "w-full p-4 text-left rounded-lg transition-colors text-lg",
                answers[currentQuestion] === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between w-full max-w-3xl mt-6 space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={classNames(
            "px-4 py-2 rounded w-full",
            currentQuestion === 0
              ? "bg-gray-300 text-black cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
