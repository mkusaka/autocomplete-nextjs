"use client";

import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

export default function Home() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = useCallback(
    debounce(async (value: string) => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: value,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setSuggestion("");
          setError(data.completion || "Failed to fetch suggestions");
        } else {
          const cleaned = (data.completion || "").trim();
          setSuggestion(cleaned);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setError("Something went wrong");
        setSuggestion("");
      } finally {
        setLoading(false);
      }
    }, 400),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      fetchSuggestions(value);
    } else {
      setSuggestion("");
    }
  };

  const handleSuggestionClick = () => {
    setInput(suggestion);
    setSuggestion("");
  };

  return (
    <div className="space-y-4 p-4 max-w-xl mx-auto relative">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Start typing..."
        className="w-full border p-2 rounded"
        autoFocus
      />

      {suggestion && !error && (
        <div
          onClick={handleSuggestionClick}
          className="absolute left-4 right-4 top-16 bg-white border border-gray-300 rounded shadow-md p-2 cursor-pointer hover:bg-gray-100 z-10 text-gray-900"
        >
          {suggestion}
        </div>
      )}

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
