"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AnswerForm from "@/app/components/AnswerForm";
import AnswerList from "@/app/components/AnswerList";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Mock question data (replace with an API call later)
    const questionData = {
      "1": { title: "How to implement sorting in Python?", content: "Explain sorting algorithms." },
      "2": { title: "What is the difference between React and Next.js?", content: "Explain differences." },
      "3": { title: "How does a HashMap work internally?", content: "Explain HashMaps." },
    };
    setQuestion(questionData[id]);
  }, [id]);

  const addAnswer = (newAnswer) => {
    setAnswers([...answers, newAnswer]);
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <p className="mt-2">{question.content}</p>

      {/* Answer System */}
      <AnswerForm onAddAnswer={addAnswer} />
      <AnswerList answers={answers} />
    </div>
  );
}
