"use client";

import { useEffect, useState } from "react";
import HistoryDetail from "../components/HistoryDetail";
import SummaryCard from "../components/SummaryCard";

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text tracking-tight">
          History Counseling
        </h1>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Summary */}
          <div className="lg:w-1/3">
            {loading ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse min-h-40" />
            ) : (
              <SummaryCard />
            )}
          </div>

          {/* Right: History */}
          <div className="lg:w-2/3">
            {loading ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <HistoryDetail />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
