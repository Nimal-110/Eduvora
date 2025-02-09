"use client";
import { useState } from "react";

export default function NewQuestionForm({ onSubmit }) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [questionContent, setQuestionContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQuestionImage(URL.createObjectURL(file));  // Display image preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (questionTitle.trim() && questionContent.trim()) {
      // Create a new question object
      const newQuestion = {
        id: Math.random().toString(36).substr(2, 9),  // Random ID
        title: questionTitle,
        content: questionContent,
        image: questionImage || null,
      };

      onSubmit(newQuestion);  // Pass new question to parent component
      // Reset the form
      setQuestionTitle("");
      setQuestionContent("");
      setQuestionImage(null);
    } else {
      alert("Please fill in both the question and the content.");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Ask a Question</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Question Title</label>
          <input
            id="title"
            type="text"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Enter your question title"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium">Question Content</label>
          <textarea
            id="content"
            rows="4"
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Describe your question in detail"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium">Attach an Image (Optional)</label>
          
          {/* Custom Choose File Button */}
          <label 
            htmlFor="image" 
            className="bg-gradient-to-r from-blue-500 to-violet-600 p-2 rounded-lg text-white cursor-pointer inline-block">
            Choose File
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          
          {questionImage && (
            <div className="mt-2">
              <img 
                src={questionImage} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded" 
              />
            </div>
          )}
        </div>

        <div>
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-violet-600 p-4 rounded-lg shadow text-white">
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
}
