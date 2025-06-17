import React from 'react';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      message: "🎉 You earned an NFT from Footlockerker Store",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      message: "🎁 You've unlocked a reward from Nike",
      timestamp: "Yesterday"
    }
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map(activity => (
          <li key={activity.id} className="border-b pb-2">
            <p>{activity.message}</p>
            <span className="text-sm text-gray-500">{activity.timestamp}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ActivityFeed;
