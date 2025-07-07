import React from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PartnerPayment = () => {
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => handlePayment();
    document.body.appendChild(script);
  };

  const handlePayment = () => {
    const options = {
      key: "RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
      amount: 19900, // 199 INR in paise
      currency: "USD",
      name: "NFT Loyalty Platform",
      description: "Brand Partnership Plan",
      handler: async function (response) {
        try {
          await addDoc(collection(db, "brandPayments"), {
            paymentId: response.razorpay_payment_id,
            amount: 9,
            status: "success",
            currency: "USD",
            createdAt: serverTimestamp(),
          });
          alert("✅ Payment Successful! Thank you.");
        } catch (error) {
          console.error("❌ Error saving payment:", error);
          alert("Payment saved failed. Please contact support.");
        }
      },
      prefill: {
        name: "Brand Partner",
        email: "brand@email.com",
      },
      theme: {
        color: "#4f46e5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-indigo-50 p-10 rounded-xl shadow text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Brand Partnership</h2>
        <p className="text-gray-600 mb-4">
          Subscribe for just 9$/month and start rewarding your customers with NFTs.
        </p>
        <button
          onClick={loadRazorpay}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md"
        >
          Pay 9$ Now
        </button>
      </div>
    </div>
  );
};

export default PartnerPayment;
