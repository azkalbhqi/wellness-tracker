"use client";

import { useEffect, useState } from "react";
import { getGeminiResponse } from "@/lib/api/gemini";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function QuotesCard() {
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // cache quote no reload
  useEffect(() => {
    const cached = localStorage.getItem("dailyQuote");
    const cachedTime = localStorage.getItem("dailyQuoteTime");

    // Check per day
    const isValidCache =
      cached && cachedTime && new Date().toDateString() === new Date(Number(cachedTime)).toDateString();

    if (isValidCache) {
      setQuote(cached);
    } else {
      fetchQuote();
    }
  }, []);


  async function fetchQuote() {
    try {
      setLoading(true);
      const response = await getGeminiResponse("Give me a short creative uplifting mental health quote.");
      setQuote(response);
      localStorage.setItem("dailyQuote", response);
      localStorage.setItem("dailyQuoteTime", Date.now().toString());
    } catch {
      setQuote("Error fetching quote. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-blue-50 to-blue-100 shadow-sm rounded-2xl p-5 border border-blue-200 relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-blue-600">Quote of the Day</h2>

        <button
          onClick={fetchQuote}
          disabled={loading}
          className="text-blue-400 hover:text-blue-600 transition-colors"
          title="Get new quote"
        >
          <RefreshCcw className={`h-5 w-5 ${loading ? "animate-spin text-blue-300" : ""}`} />
        </button>
      </div>

      <div className="mt-4 min-h-20">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-3 bg-blue-200/50 rounded w-5/6" />
            <div className="h-3 bg-blue-200/50 rounded w-3/4" />
          </div>
        ) : (
          <p className="text-gray-700 text-base italic leading-relaxed">“{quote}”</p>
        )}
      </div>
    </motion.div>
  );
}
