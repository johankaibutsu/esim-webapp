"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { esimData } from "@/lib/utils";

export default function HomePage() {
  const [bookingIdInput, setBookingIdInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (bookingIdInput.trim() === esimData.bookingId) {
      router.push(
        `/dashboard?bookingId=${encodeURIComponent(bookingIdInput.trim())}`,
      );
    } else {
      setError("Invalid Booking ID. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      {" "}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          eSIM Manager
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your Booking ID to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="bookingId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Booking ID
            </label>
            <input
              type="text"
              id="bookingId"
              value={bookingIdInput}
              onChange={(e) => setBookingIdInput(e.target.value)}
              placeholder="e.g., esim_12345678"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out font-semibold"
          >
            View Dashboard
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          (Use: <code>esim_12345678</code>)
        </p>
      </div>
    </div>
  );
}
