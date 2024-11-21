import { useLocation, useNavigate } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, score } = location.state?.results || {};

  if (!results) {
    return (
      <div className="text-center">
        <p className="text-xl mb-4">No results available.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start New Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
        <p className="text-xl">
          Your score: {score} out of {results.length}
        </p>
        <p className="text-lg text-neutral-300">
          ({((score / results.length) * 100).toFixed(1)}%)
        </p>
      </div>

      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={index}
            className={`bg-white text-black rounded-lg shadow-md p-6 ${
              result.result
                ? "border-l-4 border-green-500"
                : "border-l-4 border-red-500"
            }`}
          >
            <div className="flex items-start gap-4">
              {result.result ? (
                <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : (
                <XMarkIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">
                  Question {index + 1}: {result.question}
                </h3>
                <div className="space-y-2">
                  {result.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg ${
                        optionIndex === result.answer
                          ? "bg-green-100 text-green-800"
                          : optionIndex === result.userAnswer
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-50"
                      }`}
                    >
                      {option}
                      {optionIndex === result.answer && (
                        <span className="ml-2 text-sm">(Correct Answer)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;
