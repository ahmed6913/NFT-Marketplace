import React from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setFeedbacks(data);
    };
    fetchData();
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        What Our Users Say <span className="ml-1">💬</span>
      </h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {feedbacks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition border"
            >
              <h4 className="text-sm font-semibold text-indigo-600 mb-2">{item.name}</h4>
              <p className="text-gray-700 mb-4">{item.message}</p>
              <div className="flex items-center space-x-1">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <AiFillStar key={i} className="text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
