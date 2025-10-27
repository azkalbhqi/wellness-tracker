"use client";

import { useEffect, useState } from "react";
import { fetchHistoryData, HistoryData } from "@/lib/api/summary";
import { MessageCircle } from "lucide-react";

export default function TotalSessionCard() {
  const [totalSessions, setTotalSessions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data: HistoryData[] = await fetchHistoryData();
        setTotalSessions(data.length);
      } catch (error) {
        console.error("Error fetching total sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-600 text-sm font-medium">Total Sessions</h2>
        <MessageCircle className="w-5 h-5 text-blue-500" />
      </div>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading...</p>
      ) : (
        <div>
          <p className="text-3xl font-semibold text-gray-900">
            {totalSessions ?? 0}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Number of counseling sessions
          </p>
        </div>
      )}
    </div>
  );
}
