"use client";

import { useState } from "react";
import { Question } from "@/lib/types";
import SurveyReview from "./survery-review";
import SingleQuestion from "./single-question";
import Progress from "./progress";

interface SurveyFormProps {
    questions: Question[]
}

export default function SurveyForm({ questions } : SurveyFormProps) {
    const [error, setError] = useState("");
    const [values, setValues] = useState<{ [key: number]: any }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selecteQuestion, setSelectedQuestion] = useState(questions[0]);

    const totalQuestions = questions.length;

    const handleChange = (index: number, value: any) => {
        setValues(prev => ({ ...prev, [index]: value }));
        setError("");
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
        setError("");
    };

    const validate = () => {
        
        let newError = "";
            if (selecteQuestion.required) {
                if (selecteQuestion.type === "checkbox") {
                    if (!values[currentQuestionIndex] || values[currentQuestionIndex].length === 0) {
                        newError = "This field is required.";
                    }
                } else if (!values[currentQuestionIndex] || values[currentQuestionIndex] === "") {
                    newError = "This field is required.";
                }
            }
            if (selecteQuestion.type === "number" && values[currentQuestionIndex] && isNaN(Number(values[currentQuestionIndex]))) {
                newError = "Please enter a valid number.";
            }
        setError(newError);
        return newError === "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Submit logic here
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/survey`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ response: values }),
            })
            .then(res => {
                if (res.ok) {
                    setIsSubmitted(true);
                } else {
                    // handle error if needed
                }
            })
            .catch(() => {
                // handle network error if needed
            });
            // setIsSubmitted(true);
        }
    };

    const handleNext = () => {
        if (validate()){
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedQuestion(questions[currentQuestionIndex + 1]);
            setError("");
        }
    }

    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => prev - 1);
        setSelectedQuestion(questions[currentQuestionIndex - 1]);
    }

    if (isSubmitted) {
        return(
            <SurveyReview questions={questions} values={values} />
        )
    }

    return (
        <div className="container mx-auto p-4">
            {/* <form className="space-y-4" onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <SingleQuestion
                        key={index}
                        question={question}
                        index={index}
                        value={values[index]}
                        error={errors[index]}
                        onChange={handleChange}
                        onCheckboxChange={handleCheckboxChange} />
                ))}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor">
                    Submit
                </button>
            </form> */}
            <Progress total={totalQuestions} current={currentQuestionIndex + 1} />
            <SingleQuestion
                        question={selecteQuestion}
                        index={currentQuestionIndex}
                        value={values[currentQuestionIndex]}
                        error={error}
                        onChange={handleChange}
                        onCheckboxChange={handleCheckboxChange} />

                        <div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Previous
                                </button>
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
        </div>
    );
}