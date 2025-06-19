"use client";

import { useState } from "react";
import songs from "./songs";

export default function LyricsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [showChords, setShowChords] = useState(true);

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cancionero</h1>

      <input
        type="text"
        placeholder="Buscar canción..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <ul className="mb-6">
        {filtered.map((song, idx) => (
          <li
            key={idx}
            onClick={() => setSelected(idx)}
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
              selected === idx ? "bg-gray-200" : ""
            }`}
          >
            {song.title}
          </li>
        ))}
      </ul>

      {selected !== null && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{filtered[selected].title}</h2>
          <button
            onClick={() => setShowChords(!showChords)}
            className="mb-4 px-3 py-1 bg-blue-600 text-white rounded"
          >
            {showChords ? "Ocultar acordes" : "Mostrar acordes"}
          </button>
          <pre className="whitespace-pre-wrap text-gray-800">
            {filtered[selected].lyrics.map((line, i) => (
              <div key={i}>
                {showChords ? (
                  <>
                    <span className="text-blue-500">{line.chord}</span> {line.text}
                  </>
                ) : (
                  <>{line.text}</>
                )}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
