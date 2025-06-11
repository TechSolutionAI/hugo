import SurveyForm from "@/components/survey-form";
import { authOptions } from "@/lib/auth";
import { Question } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions); // Replace with actual session retrieval logic if needed
  if (!session) {
    redirect("/auth/login");
  }

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
    required: q.required,
    order: q.order,
  }));

  return (
    <div className="container mx-auto p-4">
      <div className="justif  y-center items-center flex flex-col">
        <h1 className="text-4xl font-bold mb-4">Welcome to Waterlily Survey </h1>
        <div className="flex flex-row justify-between items-center w-full mb-4">
        <p className="text-lg mb-4">
          Welcome {session.user.name || session.user.email}! You are logged in.
        </p>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
            Logout
          </button>
        </form>
              </div>
            
      </div>
      <div>
        <SurveyForm questions={questions} />
      </div>
    </div>
  );
}
