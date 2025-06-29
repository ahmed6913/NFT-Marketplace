// src/components/CommunityLinks.js
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";

const links = [
  {
    icon: <FaXTwitter className="text-xl" />,
    label: "X",
    desc: "For announcements, tips and general information.",
    url: "https://x.com/Lazarus_mint",
  },
  {
    icon: <FaDiscord className="text-xl text-indigo-400" />,
    label: "Discord",
    desc: "To get involved in the community, ask questions and share tips.",
    url: "https://discord.gg/4QxkzXJJ",
  },
  {
    icon: <FaGithub className="text-xl" />,
    label: "Github",
    desc: "To report bugs, request features and contribute to the project (paid).",
    url: "https://github.com/ahmed6913?tab=overview&from=2025-06-01&to=2025-06-29",
  },
];

const CommunityLinks = () => {
  return (
    <section className="bg-white py-16 px-4 text-center">
    <h2 className="text-xl font-bold text-indigo-600">Community</h2>
    <p className="text-gray-600 mb-12">
      Get involved in our community. Everyone is welcome!
    </p>
  
    <div className="flex flex-col md:flex-row justify-center gap-6">
      {/* X */}
      <a
        href="https://x.com/Lazarus_mint"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start bg-gray-100 p-6 rounded-xl w-full md:w-80 hover:shadow-lg transition"
      >
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <span className="text-xl">𝕏</span>
          <span className="font-semibold">X</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <p className="text-gray-600 text-left">
          For announcements, tips and general information.
        </p>
      </a>
  
      {/* Discord */}
      <a
        href="https://discord.gg/4QxkzXJJ"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start bg-gray-100 p-6 rounded-xl w-full md:w-80 hover:shadow-lg transition"
      >
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <span className="text-xl">💬</span>
          <span className="font-semibold">Discord</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <p className="text-gray-600 text-left">
          To get involved in the community, ask questions and share tips.
        </p>
      </a>
  
      {/* GitHub */}
      <a
        href="https://github.com/ahmed6913?tab=overview&from=2025-06-01&to=2025-06-29"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start bg-gray-100 p-6 rounded-xl w-full md:w-80 hover:shadow-lg transition"
      >
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <span className="text-xl">🐙</span>
          <span className="font-semibold">GitHub</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <p className="text-gray-600 text-left">
          To report bugs, request features and contribute to the project (paid).
        </p>
      </a>
    </div>
  </section>
  
  );
};

export default CommunityLinks;
