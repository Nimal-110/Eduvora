"use client";

import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Home, Calendar, MessageSquare, Award, User, Menu as MenuIcon, HomeIcon, CircleHelp } from "lucide-react";
import Card from "@/components/Card";
import QuestionSection from "@/components/QuestionSection";  // Import the Question Section
import NewQuestionForm from "@/components/NewQuestionForm";  // Import the New Question Form
import "@/app/globals.css";

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
    <div className="flex h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} className="h-full bg-white text-gray-900 p-4 shadow-xl rounded-r-xl">
      <Menu className="-mx-5">
          <MenuItem icon={<MenuIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" onClick={() => setCollapsed(!collapsed)} >Menu</MenuItem>
          <MenuItem icon={<HomeIcon />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/" >Home</MenuItem>
          <MenuItem icon={<Calendar />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/schedule">Schedule</MenuItem>
          <MenuItem icon={<MessageSquare />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/message">Messages</MenuItem>
          <MenuItem icon={<Award />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/rewards">Rewards</MenuItem>
          <MenuItem icon={<User />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/profile">Profile</MenuItem>
          <MenuItem icon={<CircleHelp />} className="hover:bg-gray-200 p-2 rounded-lg transition" href="/question">Ask Question</MenuItem>
        </Menu>
      
      
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-6">
       <div>
        <NewQuestionForm onSubmit={handleNewQuestion} />  {/* New Question Form */}
        <QuestionSection questions={questions} />  {/* Pass questions as prop to display */}
      </div>
 
 
      </div>
    </div>
  );
}
