"use client";

import { useState } from "react";
import songs from "./songsList";

export default function BuscadorFuturistaPage() {
  const [query, setQuery] = useState("");

  const filtered =
    query.length >= 3
      ? songs.filter((song) =>
          song.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const hasQuery = query.length > 0;
  const showResults = query.length >= 3;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-100 to-cyan-200 animate-gradient bg-[length:400%_400%] px-4 py-10">
      <div
        className={`bg-white/20 border border-cyan-200 rounded-3xl shadow-2xl backdrop-saturate-200 backdrop-blur-2xl p-10 w-full max-w-md transition-all duration-500 ${
          showResults ? "translate-y-[-40px]" : "translate-y-0"
        }`}
      >
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

      {showResults && (
        <div className="mt-6 w-full max-w-md bg-white/60 rounded-2xl p-6 shadow-md backdrop-blur-sm max-h-[50vh] overflow-y-auto">
          <h2 className="text-lg font-semibold text-cyan-800 mb-4">Resultados:</h2>
          <ul className="space-y-2">
            {filtered.map((title, i) => (
              <li
                key={i}
                className="px-4 py-2 rounded-md bg-white/90 text-gray-800 hover:bg-cyan-100 cursor-pointer transition"
              >
                {title}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-gray-500">No se encontraron canciones.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}