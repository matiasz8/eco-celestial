"use client";

import { useState } from "react";

export default function AgregarCancionPage() {
  const [rawText, setRawText] = useState("");
  const [title, setTitle] = useState("");
  const [saved, setSaved] = useState(false);

  function parseSong(raw: string) {
    const lines = raw.trim().split(/\n+/);
    const lyrics = [];
    for (let i = 0; i < lines.length; i++) {
      const chordLine = lines[i];
      const textLine = lines[i + 1] || "";
      lyrics.push({ chord: chordLine.trim(), text: textLine.trim() });
      i++;
    }
    return { title: title.trim(), lyrics };
  }

  function handleSave() {
    if (!title || !rawText) return;
    const song = parseSong(rawText);
    const stored = JSON.parse(localStorage.getItem("customSongs") || "[]");
    localStorage.setItem("customSongs", JSON.stringify([...stored, song]));
    setSaved(true);
    setRawText("");
    setTitle("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-cyan-200 animate-gradient bg-[length:400%_400%] p-8">
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-cyan-800">Agregar Canción</h1>

        <input
          type="text"
          placeholder="Título de la canción"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full px-4 py-2 border rounded bg-white/90 border-cyan-300"
        />

        <textarea
          rows={12}
          placeholder="Pegá aquí el texto de la canción con acordes"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          className="w-full px-4 py-3 border rounded bg-white/90 border-cyan-300 font-mono"
        />

        <button
          onClick={handleSave}
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded"
        >
          Guardar canción
        </button>

        {saved && (
          <p className="mt-4 text-green-700">✅ Canción guardada correctamente.</p>
        )}
      </div>
    </div>
  );
}
