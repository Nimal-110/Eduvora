"use client";
import Link from "next/link";
import { useState } from "react";

export default function QuestionsPage() {
  const [questions] = useState([
    { id: "1", title: "How to implement sorting in Python?" },
    { id: "2", title: "What is the difference between React and Next.js?" },
    { id: "3", title: "How does a HashMap work internally?" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <ul className="space-y-3">
        {questions.map((q) => (
          <li key={q.id} className="p-4 bg-white shadow rounded">
            <Link href={`/questions/${q.id}`} className="text-blue-600">
              {q.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
