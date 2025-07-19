"use client";

import { useState, useEffect, useRef } from "react";
import baseSongs from "./songsChords";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { transposeSong, convertNotation } from "./transpose";

export default function BuscadorFuturistaPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [showChords, setShowChords] = useState(true);
  const [songs, setSongs] = useState(baseSongs);
  const [transposedLyrics, setTransposedLyrics] = useState<{ chord: string; text: string }[] | null>(null);
  const [transposeOffset, setTransposeOffset] = useState(0);
  const [useSpanishNotation, setUseSpanishNotation] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMassParts, setSelectedMassParts] = useState<string[]>([]);
  const [selectedLiturgicalSeasons, setSelectedLiturgicalSeasons] = useState<string[]>([]);
  const [selectedSpecialOccasions, setSelectedSpecialOccasions] = useState<string[]>([]);

  const wasUsingFilters = useRef(false);

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
      if (original) {
        setTransposedLyrics(transposeSong(original.lyrics, transposeOffset));
      }
    }
  }, [selected, songs, transposeOffset]);

  const handleTranspose = (delta: number) => {
    setTransposeOffset(transposeOffset + delta);
  };

    const hasActiveFilters =
      selectedMassParts.length > 0 ||
      selectedLiturgicalSeasons.length > 0 ||
      selectedSpecialOccasions.length > 0;

  const filtered = songs.filter((song) => {
    const titleMatches =
        query.length < 3 || song.title.toLowerCase().includes(query.toLowerCase());

    const massMatch =
        selectedMassParts.length === 0 ||
        selectedMassParts.some((part) => song.categories?.massParts?.includes(part));

    const seasonMatch =
        selectedLiturgicalSeasons.length === 0 ||
        selectedLiturgicalSeasons.some((season) =>
        song.categories?.liturgicalSeasons?.includes(season)
        );

    const specialOccasionMatch = 
        selectedSpecialOccasions.length === 0 ||
        selectedSpecialOccasions.some((occasion) =>
        song.categories?.specialOccasions?.includes(occasion)
    );

    return titleMatches && massMatch && seasonMatch && specialOccasionMatch;
    });

  const showResults =
      query.length >= 3 || (showFilters && hasActiveFilters);


  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
    wasUsingFilters.current = !showFilters;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-100 to-cyan-200 animate-gradient bg-[length:400%_400%] px-4 py-10">
      {/* Búsqueda normal */}
      {!selected && !showFilters && (
        <div
          className={`bg-white/20 border border-cyan-200 rounded-3xl shadow-2xl backdrop-saturate-200 backdrop-blur-2xl p-10 w-full max-w-md transition-all duration-500 ease-in-out ${
            showResults ? "translate-y-[-40px]" : "translate-y-0"
          }`}
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-cyan-900 drop-shadow-md">
            Buscar canción
          </h1>
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribí el nombre..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
                setTransposeOffset(0);
              }}
              className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 border border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <button
            onClick={toggleFilters}
            className="mt-4 w-full flex justify-center text-cyan-600 hover:text-cyan-800 transition"
            aria-label="Mostrar filtros"
          >
            <span className="text-lg font-semibold">＋ Filtros</span>
          </button>
        </div>
      )}

      {!selected && showFilters && (
        <div className="flex gap-6 w-full max-w-5xl transition-all duration-500">
          {/* Filtros (izquierda) */}
          <div className="w-1/2 bg-white/20 border border-cyan-200 rounded-3xl shadow-2xl backdrop-saturate-200 backdrop-blur-2xl p-6 transition-transform duration-500 transform translate-x-[-10px] ease-in-out">
            <h1 className="text-xl font-bold text-cyan-900 mb-4">Filtros</h1>
            <button
              onClick={toggleFilters}
              className="mb-4 text-cyan-700 underline text-sm"
            >
              ✕ Ocultar filtros
            </button>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-cyan-800 mb-1">Partes de la misa:</label>
                <div className="flex flex-wrap gap-2">
                  {["Entrada", "Perdón", "Aleluya", "Ofertorio", "Santo", "Padre Nuestro", "Comunión", "Meditación", "Salida"].map((part) => (
                    <button
                      key={part}
                      onClick={() =>
                        setSelectedMassParts((prev) =>
                          prev.includes(part)
                            ? prev.filter((p) => p !== part)
                            : [...prev, part]
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectedMassParts.includes(part)
                          ? "bg-cyan-300 text-white"
                          : "bg-white text-cyan-600"
                      }`}
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>

              {/* Liturgical Seasons (derecha) */}
              <div>
                <label className="block font-medium text-cyan-800 mb-1">Tiempo litúrgico:</label>
                <div className="flex flex-wrap gap-2">
                  {["Adviento", "Cuaresma", "Tiempo Ordinario", "Pascua"].map((season) => (
                    <button
                      key={season}
                      onClick={() =>
                        setSelectedLiturgicalSeasons((prev) =>
                          prev.includes(season)
                            ? prev.filter((s) => s !== season)
                            : [...prev, season]
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectedLiturgicalSeasons.includes(season)
                          ? "bg-cyan-300 text-white"
                          : "bg-white text-cyan-600"
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              {/* Celebraciones especiales*/}
              <div>
                <label className="block font-medium text-cyan-800 mb-1">Celebraciones especiales:</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Bautismos",
                    "Comuniones",
                    "Confirmaciones",
                    "Casamientos",
                    "Funerales",
                    "Fiestas Patronales",
                    "Aniversarios",
                    "Procesiones",
                    "Adoración",
                    "Consagraciones",
                  ].map((occasion) => (
                    <button
                      key={occasion}
                      onClick={() =>
                        setSelectedSpecialOccasions((prev) =>
                          prev.includes(occasion)
                            ? prev.filter((o) => o !== occasion)
                            : [...prev, occasion]
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectedSpecialOccasions.includes(occasion)
                          ? "bg-cyan-300 text-white"
                          : "bg-white text-cyan-600"
                      }`}
                    >
                      {occasion}
                    </button>
                  ))}
                </div>
              </div>


            </div>
          </div>


          {/* Buscador y resultados (derecha) */}
          <div className="w-1/2 bg-white/60 rounded-3xl p-6 shadow-2xl backdrop-blur-sm transition-transform duration-500 transform translate-x-[10px] max-h-[80vh] overflow-y-auto">
            <h1 className="text-xl font-bold text-cyan-900 mb-4">Buscar canción</h1>

            <input
              type="text"
              placeholder="Escribí el nombre..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
                setTransposeOffset(0);
              }}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-white/80 text-gray-800 border border-white/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <h2 className="text-lg font-semibold text-cyan-800 mb-2">Resultados:</h2>
            <ul className="space-y-2">
              {filtered.map((song, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSelected(song.title);
                    setShowChords(true);
                    setTransposeOffset(0);
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
        </div>
      )}


      {!selected && showResults &&!showFilters && (
        <div className="mt-6 w-full max-w-md bg-white/60 rounded-2xl p-6 shadow-md backdrop-blur-sm max-h-[50vh] overflow-y-auto transition-all duration-500 opacity-100 scale-100">
          <h2 className="text-lg font-semibold text-cyan-800 mb-4">Resultados:</h2>
          <ul className="space-y-2">
            {filtered.map((song, i) => (
              <li
                key={i}
                onClick={() => {
                  setSelected(song.title);
                  setShowChords(true);
                  setTransposeOffset(0);
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
            onClick={() => {
              setSelected(null);
              setShowFilters(wasUsingFilters.current);
            }}
            className="absolute top-2 right-2 p-1 rounded-full text-gray-600 hover:bg-gray-200"
            aria-label="Cerrar"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <h2 className="text-xl font-bold mb-4 text-cyan-900">{selected}</h2>

          {showChords && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => setUseSpanishNotation((prev) => !prev)} className="px-3 py-1 bg-cyan-200 rounded text-sm">
                {useSpanishNotation ? "Esp" : "Ing"}
              </button>
              <button onClick={() => handleTranspose(-2)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬇️ 1</button>
              <button onClick={() => handleTranspose(-1)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬇️ 1/2</button>
              <button onClick={() => handleTranspose(1)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬆️ 1/2</button>
              <button onClick={() => handleTranspose(2)} className="px-3 py-1 bg-cyan-200 rounded text-sm">⬆️ 1</button>
            </div>
          )}

          <button
            onClick={() => setShowChords(!showChords)}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
          >
            {showChords ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>

          <div className="whitespace-pre-wrap text-gray-800 text-sm">
            {convertNotation(transposedLyrics || [], useSpanishNotation).map((line, i) => (
              <div key={i} className="mb-2">
                {showChords && <div className="text-cyan-600 font-mono">{line.chord}</div>}
                <div>{line.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
