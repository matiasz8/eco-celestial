"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-cyan-200 animate-gradient bg-[length:400%_400%]">
      <div className="backdrop-blur-md bg-white/40 rounded-xl p-10 shadow-lg max-w-md w-full border border-white/30">
        <h1 className="text-2xl font-bold text-center mb-6 text-cyan-900">
          Buscar canción
        </h1>
        <input
          type="text"
          placeholder="Escribí el nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/70 text-gray-800 border border-white/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
    </div>
  );
}