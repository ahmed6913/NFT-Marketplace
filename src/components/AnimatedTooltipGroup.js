// src/components/Landing/AnimatedTooltipGroup.jsx
import React from "react";

const teamMembers = [
  {
    name: "saim",
    role: "Software Engineer",
    image: "/founder.jpg", 
  },
 
];

const AnimatedTooltipGroup = () => {
  return (
    <section className="flex flex-col items-center mt-10">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-indigo-600">Meet Our Team</h2>
        <p className="text-sm text-gray-500">People building the future of Web3 loyalty</p>
      </div>
      <div className="flex space-x-[-10px]">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center"
          >
            <div
              className={`w-16 h-16 rounded-full border-2 ${
                idx === 0 ? "border-indigo-500" : "border-white"
              } overflow-hidden relative group`}
            >
              <img
                src={member.image}
                alt={`Member ${idx}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                  {member.name} <br />
                  <span className="text-gray-300">{member.role}</span>
                </div>
              )}
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-medium text-gray-800">{member.name}</p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedTooltipGroup;
