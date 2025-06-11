import { Question } from "@/lib/types";

interface SingleQuestionProps {
  question: Question;
  index: number;
  value: any;
  error: string;
  onChange: (index: number, value: any) => void;
  onCheckboxChange: (index: number, option: string) => void;
}

export default function SingleQuestion({
  question,
  index,
  value,
  error,
  onChange,
  onCheckboxChange,
}: SingleQuestionProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          {question.title}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h2>
        {question.description && (
          <p className="text-sm text-gray-500 mt-1">{question.description}</p>
        )}
      </div>

      {question.type === "number" && (
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder={`Enter your ${question.title.toLowerCase()}`}
          required={question.required}
          value={value || ""}
          onChange={(e) => onChange(index, e.target.value)}
        />
      )}

      {question.type === "radio" && question.options && (
        <div className="space-y-2">
          {question.options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                className="accent-blue-600"
                checked={value === option}
                required={question.required}
                onChange={() => onChange(index, option)}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "select" && question.options && (
        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required={question.required}
          value={value || ""}
          onChange={(e) => onChange(index, e.target.value)}
        >
          <option value="">Select an option</option>
          {question.options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {question.type === "checkbox" && question.options && (
        <div className="space-y-2">
          {question.options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={option}
                className="accent-blue-600"
                checked={value?.includes(option) || false}
                onChange={() => onCheckboxChange(index, option)}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {error && error !== "" && (
        <p className="text-red-500 text-sm font-medium mt-2">{error}</p>
      )}
    </div>
  );
}
