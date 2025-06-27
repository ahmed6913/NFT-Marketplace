// src/components/ConfettiButton.jsx
import React from 'react';
import confetti from 'canvas-confetti';

const ConfettiButton = () => {
  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleConfetti}
        className="relative overflow-visible rounded-full hover:-translate-y-1 transition-all duration-300 px-8 py-3 text-white font-semibold shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-indigo-400/40 after:z-[-1] after:transition after:duration-500 hover:after:scale-150 hover:after:opacity-0"
      >
        🎉 Celebrate
      </button>
    </div>
  );
};

export default ConfettiButton;
