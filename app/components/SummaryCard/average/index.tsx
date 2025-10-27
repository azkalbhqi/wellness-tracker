"use client";

import { useEffect, useState } from "react";
import { fetchHistoryData, HistoryData } from "@/lib/api/summary";
import { Clock } from "lucide-react";

export default function AverageDurationCard() {
  const [averageDuration, setAverageDuration] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data: HistoryData[] = await fetchHistoryData();
        if (data.length > 0) {
          const totalDuration = data.reduce((sum, item) => sum + item.duration, 0);
          const avg = totalDuration / data.length;
          setAverageDuration(avg);
        } else {
          setAverageDuration(0);
        }
      } catch (error) {
        console.error("Error fetching average duration:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-600 text-sm font-medium">Average Duration</h2>
        <Clock className="w-5 h-5 text-blue-500" />
      </div>

      {loading ? (
        <p className="text-gray-400 animate-pulse">Loading...</p>
      ) : (
        <div>
          <p className="text-3xl font-semibold text-gray-900">
            {averageDuration ? averageDuration.toFixed(1) : 0} <span className="text-sm text-gray-500">min</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Average counseling session length
          </p>
        </div>
      )}
    </div>
  );
}
