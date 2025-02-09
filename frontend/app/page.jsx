"use client";
import { useState } from "react";
import QuestionSection from "@/app/components/Q";  // Import the Question Section
import NewQuestionForm from "@/app/components/N";  // Import the New Question Form
import "@/public/styles/globals.css";

export default function Home() {
  const [questions, setQuestions] = useState([
    { id: "1", title: "How to implement sorting in Python?", content: "Explain sorting algorithms." },
    { id: "2", title: "What is the difference between React and Next.js?", content: "Explain differences." },
    // Pre-existing questions
  ]);

  const handleNewQuestion = (newQuestion) => {
    setQuestions([newQuestion, ...questions]);  // Add the new question to the list
  };

  return (
    <div>
      <NewQuestionForm onSubmit={handleNewQuestion} />  {/* New Question Form */}
      <QuestionSection questions={questions} />  {/* Pass questions as prop to display */}
    </div>
  );
}
