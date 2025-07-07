import React from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const Partner = () => {
  const navigate = useNavigate();

  const sendConfirmationEmail = async (data) => {
    try {
      await emailjs.send(
        "service_0saqbq6", // replace this
        "template_cvvvec7", // replace this
        {
          name: data.name,
          email: data.email,
        },
        "O5KXoUJgZTyJAUlo2" // replace this
      );
      console.log("✅ Email sent");
    } catch (error) {
      console.error("❌ Email error:", error);
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      brand: form.brand.value,
      message: form.message.value,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "demoRequests"), data);
      await sendConfirmationEmail(data);
      alert("✅ Demo request submitted! Check your inbox.");
      form.reset();
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Paid Partner Option */}
        <div className="bg-indigo-50 p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Become a Brand Partner</h2>
          <p className="text-gray-600 mb-6">
            Launch your NFT rewards program instantly. Start from just $9/month.
          </p>
          <button
            onClick={() => navigate("/partner/payment")}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            Get Started
          </button>
        </div>

        {/* Demo Request Option */}
        <div className="bg-white p-8 rounded-xl border shadow">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Request a Free Demo</h2>
          <p className="text-gray-600 mb-6">
            Want to see how it works? Get a free walkthrough tailored to your brand.
          </p>
          <form className="space-y-4" onSubmit={handleDemoSubmit}>
            <input
              name="name"
              type="text"
              required
              placeholder="Your Name"
              className="w-full rounded-md border-gray-300 p-2"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full rounded-md border-gray-300 p-2"
            />
            <input
              name="brand"
              type="text"
              placeholder="Brand Name"
              className="w-full rounded-md border-gray-300 p-2"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={3}
              className="w-full rounded-md border-gray-300 p-2"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
            >
              Request Demo
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Partner;
