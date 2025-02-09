"use client";
import { useState } from "react";

export default function AnswerForm({ onAddAnswer }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() === "") return;
    onAddAnswer(answer);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        placeholder="Write your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit" className="bg-gradient-to-r from-blue-500 to-violet-600 p-6 rounded-lg shadow">
        Submit Answer
      </button>
    </form>
  );
}
