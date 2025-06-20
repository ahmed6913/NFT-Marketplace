import React, { useState } from 'react';

const ConfirmModal = ({ nft, onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm(); // Calls alert or backend logic
    }, 2000); // Simulated transaction delay
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-2 text-indigo-700">
          Confirm Purchase
        </h2>
        <p className="text-sm mb-4 text-gray-600">
          Are you sure you want to buy <strong>{nft.name}</strong> for <strong>{nft.price} ETH</strong>?
        </p>
        {loading ? (
          <div className="text-indigo-600 font-medium py-2">Processing...</div>
        ) : (
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirm}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
