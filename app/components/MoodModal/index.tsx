"use client";

import { useState } from "react";
import { addMoodData } from "@/lib/api/mood";
import Swal from "sweetalert2";

export default function MoodModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = async (value: number) => {
    setLoading(true);
    try {
      const result = await addMoodData(value);

      if (result) {
        // trigger notif
        window.dispatchEvent(new Event("moodUpdated"));

        // success alert
        await Swal.fire({
          title: "Mood Recorded!",
          text: "Your mood has been successfully saved.",
          icon: "success",
          confirmButtonColor: "#3B82F6",
          confirmButtonText: "Awesome!",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        onClose(); // close modal
      }
    } catch (error) {
      console.error("Failed to submit mood:", error);
      Swal.fire({
        title: "Oops!",
        text: "Failed to record your mood. Try again later.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          How are you feeling today?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleMoodSelect(25)}
            disabled={loading}
            className="bg-red-100 hover:bg-red-200 text-red-600 font-medium py-3 rounded-xl transition-all"
          >
            😡 Angry
          </button>
          <button
            onClick={() => handleMoodSelect(40)}
            disabled={loading}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-3 rounded-xl transition-all"
          >
            😢 Sad
          </button>
          <button
            onClick={() => handleMoodSelect(60)}
            disabled={loading}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium py-3 rounded-xl transition-all"
          >
            🙂 Happy
          </button>
          <button
            onClick={() => handleMoodSelect(90)}
            disabled={loading}
            className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 rounded-xl transition-all"
          >
            😍 Great
          </button>
        </div>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-5 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
