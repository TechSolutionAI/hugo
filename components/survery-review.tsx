import { Question } from "@/lib/types";

interface SurveyReviewProps {
  questions: Question[];
  values: { [key: number]: any };
}

export default function SurveyReview({ questions, values }: SurveyReviewProps) {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Survey Review</h2>

        <ul className="space-y-6">
          {questions.map((question, index) => {
            const answer = values[index];
            const displayAnswer = Array.isArray(answer)
              ? answer.join(", ")
              : answer || null;

            return (
              <li
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {index + 1}. {question.title}
                </h3>
                <p className="mt-2 text-gray-700">
                  {displayAnswer ? (
                    <span>{displayAnswer}</span>
                  ) : (
                    <span className="text-red-500 italic">No response</span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
            onClick={() => window.location.reload()} // Replace this with a reset handler if available
          >
            Retake Survey
          </button>
        </div>
      </div>
    </div>
  );
}
