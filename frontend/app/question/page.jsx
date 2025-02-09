"use client";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon, CircleHelp } from "lucide-react";
import Card from "@/components/Card";
import QuestionSection from "@/components/QuestionSection";  // Import the Question Section
import NewQuestionForm from "@/components/NewQuestionForm";  // Import the New Question Form
import "@/app/globals.css";
import SideCompo from "@/components/SideCompo";

export default function Message() {
  const [collapsed, setCollapsed] = useState(false);
  const [questions, setQuestions] = useState([
    { id: "1", title: "How to implement sorting in Python?", content: "Explain sorting algorithms." },
    { id: "2", title: "What is the difference between React and Next.js?", content: "Explain differences." },
    // Pre-existing questions
  ]);

  const handleNewQuestion = (newQuestion) => {
    setQuestions([newQuestion, ...questions]);  // Add the new question to the list
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <div className="fixed">
              <SideCompo/>
            </div>

      {/* Main Content */}
      <div className="flex-1 flex-wrap p-6 ml-[250px]">
        <NewQuestionForm onSubmit={handleNewQuestion} />  {/* New Question Form */}
        <QuestionSection questions={questions} />  {/* Pass questions as prop to display */}
      </div>
    </div>
  );
}
