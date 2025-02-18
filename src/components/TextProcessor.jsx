import { useState } from "react";
import { useSummary } from "use-react-summary";

const TextProcessor = () => {
  const [text, setText] = useState("");
  const { summarizeText, isLoading, error } = useSummary({ text, words: 100 });
  const [questions, setQuestions] = useState([]);

  // Question generation function
  const generateQuestions = () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }

    const words = text.split(" ");
    const generatedQuestions = words
      .filter((_, index) => index % 5 === 4)
      .map((word) => `What is the meaning of "${word}"?`);

    setQuestions(generatedQuestions);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
        Text Summarizer & Question Generator
      </h1>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
        rows="6"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        onClick={() => summarizeText()}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        disabled={isLoading}
      >
        {isLoading ? "Summarizing..." : "Summarize"}
      </button>
      <button
        onClick={generateQuestions}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Generate Questions
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Summary:</h3>
        <p className="p-3 bg-gray-100 rounded-lg">{summarizeText}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Generated Questions:</h3>
        <ul className="list-disc pl-6 bg-gray-100 p-3 rounded-lg">
          {questions.map((q, index) => (
            <li key={index} className="text-gray-600">{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextProcessor;
