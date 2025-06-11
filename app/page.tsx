import SurveyForm from "@/components/survey-form";
import { questions } from "@/lib/mockdata";
import { Question } from "@/lib/types";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="justif  y-center items-center flex flex-col">
        <h1 className="text-4xl font-bold mb-4">Welcome to Waterlily Survey </h1>
        <p className="text-lg mb-4">
          Waterlily Survey is a tool for creating and managing surveys with ease.
        </p>
      </div>
      <div>
        <SurveyForm questions={questions as Question[]} />
      </div>
    </div>
  );
}
