import { Question } from "@/lib/types";

interface SurveyReviewProps {
    questions: Question[];
    values: { [key: number]: any };
}

export default function SurveyReview({ questions, values }: SurveyReviewProps) {    
    return(
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Survey Review</h2>
            <ul className="space-y-2">
                {questions.map((question, index) => (
                    <li key={index} className="">
                        <h3 className="font-semibold">{question.title}</h3>
                        <div className="mt-1">
                            {Array.isArray(values[index]) ? (
                                values[index].join(", ")
                            ) : (
                                values[index] || "No response"
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <form>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-4">
                    Retake Survey
            </button>
            </form>
        </div>
    );
}