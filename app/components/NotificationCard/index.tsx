"use client";

import { useEffect, useState } from "react";
import { fetchMoodData, MoodData } from "@/lib/api/mood";
import { motion } from "framer-motion";
import { Bell, Smile, Frown, Meh } from "lucide-react";

export default function NotificationCard() {
  const [recent, setRecent] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const moods = await fetchMoodData();
        const sorted = moods.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecent(sorted.slice(0, 2));
      } catch (error) {
        console.error("Error fetching mood data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    window.addEventListener("moodUpdated", loadData);
    return () => window.removeEventListener("moodUpdated", loadData);
  }, []);
 

  

  const getMoodIcon = (mood: number) => {
    if (mood >= 50) return <Smile className="text-green-500 w-5 h-5" />;
    if (mood === 30) return <Meh className="text-yellow-500 w-5 h-5" />;
    return <Frown className="text-red-500 w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100 w-full hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Bell className="text-blue-500 w-5 h-5" />
          Recent Activity
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {loading ? (
          <>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-blue-100 rounded-full" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </>
        ) : recent.length > 0 ? (
          recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-blue-50/40 rounded-xl px-4 py-2 border border-blue-100"
            >
              <div className="flex items-center gap-3">
                {getMoodIcon(item.mood)}
                <div>
                  <p className="text-sm text-gray-800 font-medium">
                    You logged a mood of <span className="text-blue-600 font-semibold">{item.mood}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recent activity yet.</p>
        )}
      </div>
    </motion.div>
  );
}
