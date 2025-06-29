// src/components/FeedbackForm.js
import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("👍");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "feedback"), {
      name,
      message,
      emoji,
      timestamp: serverTimestamp(),
    });
    setName("");
    setMessage("");
    setEmoji("👍");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl mx-auto"
    >
      <input
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Your feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <div className="flex items-center space-x-3">
        <label className="font-medium text-gray-700">Reaction:</label>
        <select
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="👍">👍</option>
          <option value="❤️">❤️</option>
          <option value="🔥">🔥</option>
          <option value="😎">😎</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-md transition"
      >
        Submit Feedback
      </button>
      {submitted && (
        <p className="text-green-600 text-sm mt-2">Thanks for your feedback! 🚀</p>
      )}
    </form>
  );
};

export default FeedbackForm;
