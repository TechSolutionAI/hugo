import SurveyForm from "@/components/survey-form";
import { Question } from "@/lib/types";

export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/question`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const dbQuestions = await res.json();
  const questions: Question[] = dbQuestions.map((q: any) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    type: q.type,
    options: q.options ? JSON.parse(q.options) : [],
  }));

  return (
    <div className="container mx-auto p-4">
      <div className="justif  y-center items-center flex flex-col">
        <h1 className="text-4xl font-bold mb-4">Welcome to Waterlily Survey </h1>
        <p className="text-lg mb-4">
          Waterlily Survey is a tool for creating and managing surveys with ease.
        </p>
      </div>
      <div>
        <SurveyForm questions={questions} />
      </div>
    </div>
  );
}
