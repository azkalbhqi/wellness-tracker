"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchHistoryData, HistoryData } from "@/lib/api/summary";

const ITEMS_PER_PAGE = 4;

export default function HistoryDetailPage() {
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHistoryData();
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setHistory(sorted);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedData = history.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-semibold text-gray-800 mb-8 text-center"
      >
        Counseling Session History
      </motion.h1>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-xl p-4 border border-gray-100 shadow-sm min-h-[70px]"
            >
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* History List */}
          <motion.div
            layout
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06 },
              },
            }}
          >
            {displayedData.map((session) => (
              <motion.div
                key={session.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
                className="bg-white border border-gray-100 shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-all min-h-24"
              >
                <div>
                  <p className="text-gray-800 font-medium text-lg">
                    {session.counselor_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(session.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-blue-600 font-semibold text-lg">
                    {session.duration} min
                  </p>
                  <p className="text-xs text-gray-400">Duration</p>
                </div>
              </motion.div>
            ))}

            {history.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-10"
              >
                No counseling sessions found.
              </motion.p>
            )}
          </motion.div>

          {/* Pagination */}
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center items-center mt-8 space-x-4 min-h-11"
          >
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium border shadow-sm transition-all ${
                page === 1
                  ? "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-600 text-sm">
              Page{" "}
              <span className="font-semibold text-blue-600">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium border shadow-sm transition-all ${
                page === totalPages
                  ? "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              Next
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}
