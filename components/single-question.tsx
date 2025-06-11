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
    onCheckboxChange}: SingleQuestionProps) {

        return ( 
            <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">
                            {question.title}
                            {question.required && <span className="text-red-500 ml-1">*</span>}
                        </h2>
                        {question.description && (
                            <p className="text-sm text-gray-600 mb-2">{question.description}</p>
                        )}
                        {question.type === "number" && (
                            <input
                                type="number"
                                className="border rounded w-full p-2"
                                placeholder={`Enter your ${question.title.toLowerCase()}`}
                                required={question.required}
                                value={value || ""}
                                onChange={e => onChange(index, e.target.value)}
                            />
                        )}
                        {question.type === "radio" && question.options && (
                            question.options.map((option, idx) => (
                                <label key={idx} className="block">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        className="mr-2"
                                        required={question.required}
                                        checked={value === option}
                                        onChange={() => onChange(index, option)}
                                    />
                                    {option}
                                </label>
                            ))
                        )}
                        {question.type === "select" && question.options && (
                            <select
                                className="border rounded w-full p-2"
                                required={question.required}
                                value={value || ""}
                                onChange={e => onChange(index, e.target.value)}
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
                            question.options.map((option, idx) => (
                                <label key={idx} className="block">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        className="mr-2"
                                        checked={value?.includes(option) || false}
                                        onChange={() => onCheckboxChange(index, option)}
                                    />
                                    {option}
                                </label>
                            ))
                        )}
                        {error && error !== "" && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>
        );

}