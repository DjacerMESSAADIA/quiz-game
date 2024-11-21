import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen p-4 flex items-center justify-center bg-gray-900">
        <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-white">
            Quiz App
          </h1>
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
