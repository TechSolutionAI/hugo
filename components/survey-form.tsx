"use client";

import { useState } from "react";
import { Question } from "@/lib/types";
import SurveyReview from "./survery-review";

interface SurveyFormProps {
    questions: Question[]
}

export default function SurveyForm({ questions } : SurveyFormProps) {
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [values, setValues] = useState<{ [key: number]: any }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (index: number, value: any) => {
        setValues(prev => ({ ...prev, [index]: value }));
        setErrors(prev => ({ ...prev, [index]: "" }));
    };

    const handleCheckboxChange = (index: number, option: string) => {
        setValues(prev => {
            const prevArr = prev[index] || [];
            if (prevArr.includes(option)) {
                return { ...prev, [index]: prevArr.filter((o: string) => o !== option) };
            } else {
                return { ...prev, [index]: [...prevArr, option] };
            }
        });
        setErrors(prev => ({ ...prev, [index]: "" }));
    };

    const validate = () => {
        const newErrors: { [key: number]: string } = {};
        questions.forEach((q, idx) => {
            if (q.required) {
                if (q.type === "checkbox") {
                    if (!values[idx] || values[idx].length === 0) {
                        newErrors[idx] = "This field is required.";
                    }
                } else if (!values[idx] || values[idx] === "") {
                    newErrors[idx] = "This field is required.";
                }
            }
            if (q.type === "number" && values[idx] && isNaN(Number(values[idx]))) {
                newErrors[idx] = "Please enter a valid number.";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Submit logic here
            alert("Form submitted! - " + JSON.stringify(values));

            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return(
            <SurveyReview questions={questions} values={values} />
        )
    }

    return (
        <div className="container mx-auto p-4">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {questions.map((question, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow">
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
                                value={values[index] || ""}
                                onChange={e => handleChange(index, e.target.value)}
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
                                        checked={values[index] === option}
                                        onChange={() => handleChange(index, option)}
                                    />
                                    {option}
                                </label>
                            ))
                        )}
                        {question.type === "select" && question.options && (
                            <select
                                className="border rounded w-full p-2"
                                required={question.required}
                                value={values[index] || ""}
                                onChange={e => handleChange(index, e.target.value)}
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
                                        checked={values[index]?.includes(option) || false}
                                        onChange={() => handleCheckboxChange(index, option)}
                                    />
                                    {option}
                                </label>
                            ))
                        )}
                        {errors[index] && (
                            <p className="text-red-500 text-sm mt-1">{errors[index]}</p>
                        )}
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
}