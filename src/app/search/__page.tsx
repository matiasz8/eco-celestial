"use client";

import { useState } from "react";

export default function BuscadorFuturistaPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-cyan-200 animate-gradient bg-[length:400%_400%]">
      <div className="bg-white/20 border border-cyan-200 rounded-3xl shadow-2xl backdrop-saturate-200 backdrop-blur-2xl p-10 w-full max-w-md hover:scale-105 transition-transform duration-300">
        <h1 className="text-2xl font-bold text-center mb-6 text-cyan-900 drop-shadow-md">
          Buscar canción
        </h1>
        <input
          type="text"
          placeholder="Escribí el nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 border border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
    </div>
  );
}
