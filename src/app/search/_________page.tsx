"use client";

import { useState, useEffect } from "react";
import baseSongs from "./songsChords";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { transposeChord, transposeSong } from "./_transpose";

export default function BuscadorFuturistaPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showChords, setShowChords] = useState(true);
  const [songs, setSongs] = useState(baseSongs);
  const [transposedLyrics, setTransposedLyrics] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("customSongs");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSongs([...baseSongs, ...parsed]);
    }
  }, []);

  useEffect(() => {
    if (selected) {
      const original = songs.find((s) => s.title === selected);
      setTransposedLyrics(original?.lyrics || []);
    }
  }, [selected, songs]);

  const handleTranspose = (semitones: number) => {
    if (!selected) return;
    const original = songs.find((s) => s.title === selected);
    if (!original) return;
    setTransposedLyrics(transposeSong(original.lyrics, semitones));
  };

  const filtered =
    query.length >= 3
      ? songs.filter((song) =>
          song.title.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const showResults = query.length >= 3;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-100 to-cyan-200 animate-gradient bg-[length:400%_400%] px-4 py-10">
      {!selected && (
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
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 border border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      )}

      {!selected && showResults && (
        <div className="mt-6 w-full max-w-md bg-white/60 rounded-2xl p-6 shadow-md backdrop-blur-sm max-h-[50vh] overflow-y-auto transition-all duration-500 opacity-100 scale-100">
          <h2 className="text-lg font-semibold text-cyan-800 mb-4">Resultados:</h2>
          <ul className="space-y-2">
            {filtered.map((song, i) => (
              <li
                key={i}
                onClick={() => {
                  setSelected(song.title);
                  setShowChords(true);
                }}
                className="px-4 py-2 rounded-md bg-white/90 text-gray-800 hover:bg-cyan-100 cursor-pointer transition"
              >
                {song.title}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="text-gray-500">No se encontraron canciones.</li>
            )}
          </ul>
        </div>
      )}

      {selected && (
        <div className="w-full max-w-md bg-white/90 p-6 rounded-xl shadow-xl transition-all duration-500 relative">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-2 p-1 rounded-full text-gray-600 hover:bg-gray-200"
            aria-label="Cerrar"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <h2 className="text-xl font-bold mb-4 text-cyan-900">{selected}</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => handleTranspose(-2)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬇️ 1 tono</button>
            <button onClick={() => handleTranspose(-1)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬇️ 1/2 tono</button>
            <button onClick={() => handleTranspose(1)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬆️ 1/2 tono</button>
            <button onClick={() => handleTranspose(2)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬆️ 1 tono</button>
          </div>

          <button
            onClick={() => setShowChords(!showChords)}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
          >
            {showChords ? (
              <>
                <EyeSlashIcon className="h-5 w-5" /> Ocultar acordes
              </>
            ) : (
              <>
                <EyeIcon className="h-5 w-5" /> Mostrar acordes
              </>
            )}
          </button>

          <div className="whitespace-pre-wrap text-gray-800 text-sm">
            {transposedLyrics?.map((line, i) => (
              <div key={i} className="mb-2">
                {showChords && (
                  <div className="text-cyan-600 font-mono">{line.chord}</div>
                )}
                <div>{line.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
