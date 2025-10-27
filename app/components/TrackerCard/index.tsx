"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchMoodData, MoodData } from "@/lib/api/mood";

type RangeOption = "3" | "7" | "30";

export default function TrackerCard() {
  const [range, setRange] = useState<RangeOption>(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return "3";
    }
    return "7";
  });

  const [data, setData] = useState<MoodData[]>([]);
  const [filtered, setFiltered] = useState<MoodData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const moods = await fetchMoodData();
      setData(moods);
    };
    loadData();
  }, []);

  // Update range on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && range !== "3") {
        setRange("3");
      } else if (window.innerWidth >= 768 && range !== "7") {
        setRange("7");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [range]);

  //Filter data
  useEffect(() => {
    const loadData = async () => {
      try {
        // ambil data terbaru
        const newData = await fetchMoodData(); // sesuaikan dengan fungsi fetch kamu
        setData(newData); // update state data
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
  
    // listener event
    window.addEventListener("moodUpdated", loadData);
  
    // cleanup
    return () => window.removeEventListener("moodUpdated", loadData);
  }, []); // dijalankan sekali saat mount
  
  useEffect(() => {
    if (data.length > 0) {
      const days = parseInt(range);
      const filteredData = data.slice(-days).map((m) => ({
        ...m,
        day: new Date(m.createdAt).toLocaleDateString("en-US", {
          weekday: "short",
        }),
      }));
      setTimeout(() => {
        setFiltered(filteredData);
      }, 0);
    }
  }, [data, range]);
  

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Mood Change</h2>

        <div className="relative">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as RangeOption)}
            className="
              appearance-none bg-blue-50 text-blue-500 text-sm font-medium 
              px-3 py-1.5 rounded-full pr-6 cursor-pointer
              hover:bg-blue-100 transition focus:outline-none
            "
          >
            <option value="3">Last 3 Days</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
          <span className="absolute right-3 top-1 text-blue-400 pointer-events-none">▼</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filtered} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="day"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                border: "1px solid #E5E7EB",
                color: "#1F2937",
              }}
              cursor={{ stroke: "#93C5FD", strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="mood"
              stroke="#3B82F6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMood)"
              dot={{ r: 4, fill: "#3B82F6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
