export default function QuestionSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Questions</h2>
      {/* List of Questions */}
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl">What is machine learning?</h3>
          <p className="text-gray-600">Can someone explain the basics of machine learning?</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl">How do neural networks work?</h3>
          <p className="text-gray-600">Looking for a simple explanation of neural networks.</p>
        </div>
      </div>

      {/* New Question Form
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Ask a Question</h3>
        <form className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Your question here"
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit Question
          </button>
        </form>
      </div>
     */}
     </div>
  );
}
