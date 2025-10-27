"use client";

import { useState, useEffect } from "react";
import TotalSessionCard from "./amount";
import AverageDurationCard from "./average";

export default function SummaryCard() {
  const [loading, setLoading] = useState(true);

  // Simulasi loading saat data diambil dari kedua card
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // bisa diatur sesuai kebutuhan
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
      </div>

      {/* Content */}
      <div className="text-gray-700 flex flex-col gap-5">
        {loading ? (
          <>
            <div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>
          </>
        ) : (
          <>
            <TotalSessionCard />
            <AverageDurationCard />
          </>
        )}
      </div>
    </div>
  );
}
