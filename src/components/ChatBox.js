import React, { useRef, useEffect, useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: "anon1", text: "Welcome to the global chat!" },
    { id: 2, user: "anon2", text: "Say hi to everyone 👋" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: "anon", text: input },
    ]);
    setInput("");
  };

  return (
    <section className="max-w-2xl mx-auto mt-12 mb-16 bg-white border border-gray-200 rounded-xl shadow-lg">
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-2xl font-bold text-indigo-600 mb-2 text-center">Anonymous Global Chat</h3>
        <p className="text-gray-500 text-center mb-4 text-sm">Chat with everyone, instantly. No login required.</p>
      </div>
      <div className="h-64 overflow-y-auto px-6 pb-2 flex flex-col gap-2 bg-gray-50 rounded-t-xl border-t border-x border-gray-100">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-2">
            <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-lg shadow-sm">{msg.user}</span>
            <span className="bg-white border border-gray-200 px-3 py-2 rounded-lg text-gray-800 text-sm shadow-sm">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex items-center gap-2 px-6 py-4 border-t border-gray-100 bg-white rounded-b-xl">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-800"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={200}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ChatBox; 