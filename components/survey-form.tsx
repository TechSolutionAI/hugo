"use client";

import { useState, useEffect, useRef } from "react";
import { Question } from "@/lib/types";
import SurveyReview from "./survery-review";
import SingleQuestion from "./single-question";
import Progress from "./progress";

interface SurveyFormProps {
  questions: Question[];
}

export default function SurveyForm({ questions }: SurveyFormProps) {
  const [error, setError] = useState("");
  const [values, setValues] = useState<{ [key: number]: any }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const formRef = useRef<HTMLDivElement>(null);

  const totalQuestions = questions.length;

  useEffect(() => {
    setSelectedQuestion(questions[currentQuestionIndex]);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentQuestionIndex]);

  const handleChange = (index: number, value: any) => {
    setValues((prev) => ({ ...prev, [index]: value }));
    setError("");
  };

  const handleCheckboxChange = (index: number, option: string) => {
    setValues((prev) => {
      const prevArr = prev[index] || [];
      return {
        ...prev,
        [index]: prevArr.includes(option)
          ? prevArr.filter((o: string) => o !== option)
          : [...prevArr, option],
      };
    });
    setError("");
  };

  const validate = () => {
    let newError = "";

    if (selectedQuestion.required) {
      const val = values[currentQuestionIndex];
      if (selectedQuestion.type === "checkbox" && (!val || val.length === 0)) {
        newError = "This field is required.";
      } else if (!val || val === "") {
        newError = "This field is required.";
      }
    }

    if (
      selectedQuestion.type === "number" &&
      values[currentQuestionIndex] &&
      isNaN(Number(values[currentQuestionIndex]))
    ) {
      newError = "Please enter a valid number.";
    }

    setError(newError);
    return newError === "";
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/survey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response: values }),
        }
      );
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setError("");
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
    setError("");
  };

  if (isSubmitted) {
    return <SurveyReview questions={questions} values={values} />;
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-4 md:p-6" ref={formRef}>
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6">
        <Progress total={totalQuestions} current={currentQuestionIndex + 1} />

        <SingleQuestion
          question={selectedQuestion}
          index={currentQuestionIndex}
          value={values[currentQuestionIndex]}
          error={error}
          onChange={handleChange}
          onCheckboxChange={handleCheckboxChange}
        />

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Previous
          </button>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
