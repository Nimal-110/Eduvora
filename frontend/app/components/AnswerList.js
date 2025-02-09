"use client";

export default function AnswerList({ answers }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Answers</h2>
      <ul className="mt-2 space-y-2">
        {answers.length === 0 ? (
          <p className="text-gray-500">No answers yet. Be the first to answer!</p>
        ) : (
          answers.map((ans, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded">
              {ans}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

