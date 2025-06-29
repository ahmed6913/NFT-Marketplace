// src/components/FeedbackDisplay.js
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase"; // ✅ correct path


const FeedbackDisplay = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "feedback"), (snapshot) => {
      const feedbackData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbackList(feedbackData);
    });

    return () => unsubscribe(); // ✅ Clean up listener on unmount
  }, []);

  return (
    <div className="mt-8 text-left">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">What users are saying:</h3>
      <ul className="space-y-3">
        {feedbackList.map((fb) => (
          <li key={fb.id} className="bg-white p-4 shadow rounded-lg border">
            <p className="text-gray-800">{fb.message}</p>
            <p className="text-sm text-gray-500 mt-1">👍 ❤️ 😍</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackDisplay;
