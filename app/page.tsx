'use client'
import { Plus } from "lucide-react";
import NotificationCard from "./components/NotificationCard";
import QuotesCard from "./components/QuotesCard";
import SummaryCard from "./components/SummaryCard";
import TrackerCard from "./components/TrackerCard";
import MoodModal from "./components/MoodModal";
import { useState } from "react";

export default function Home() {
  const [openMoodModal, setOpenMoodModal] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-blue-50/30 to-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text tracking-tight">
          Dashboard
        </h1>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Summary takes 2/3 width on desktop */}
          <div className="md:w-2/3 w-full">
            <SummaryCard />
          </div>

          {/* Quotes takes 1/3 width on desktop */}
          <div className="md:w-1/3 w-full flex flex-col gap-2">
            <QuotesCard />
            <NotificationCard />
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          <TrackerCard />
        </div>
      </div>

      {/* Floating Add Mood Button */}
      <button
        onClick={() => setOpenMoodModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      <MoodModal isOpen={openMoodModal} onClose={() => setOpenMoodModal(false)} />
    </main>
  );
}
