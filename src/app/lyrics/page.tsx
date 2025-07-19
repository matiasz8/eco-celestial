"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SongCard } from "@/components/search/SongCard";
import { SearchResults } from "@/components/search/SearchResults";
import { MusicalNoteIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import songs from "./songs";
import { transposeSong } from "@/app/search/transpose";
import { STORAGE_KEYS, APP_CONFIG } from "@/lib/constants";
import type { Song, TransposedLyricLine } from "@/types";

export default function LyricsPage() {
  // Estado principal
  const [search, setSearch] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [allSongs, setAllSongs] = useState<Song[]>(songs);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  // Estado de visualización
  const [showChords, setShowChords] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Estado de transposición
  const [transposeOffset, setTransposeOffset] = useState(0);
  const [useSpanishNotation, setUseSpanishNotation] = useState(true);
  const [transposedLyrics, setTransposedLyrics] = useState<
    TransposedLyricLine[] | null
  >(null);

  // Cargar canciones personalizadas
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_SONGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        setAllSongs([...songs, ...parsed]);
      }
    } catch (error) {
      console.error("Error loading custom songs:", error);
    }
  }, []);

  // Actualizar letras transponidas cuando cambia la canción seleccionada
  useEffect(() => {
    if (selectedSong) {
      const transposed = transposeSong(selectedSong.lyrics, transposeOffset);
      setTransposedLyrics(transposed);
    }
  }, [selectedSong, transposeOffset]);

  // Filtrar canciones
  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      const filtered = allSongs.filter(song =>
        song.title.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredSongs(filtered.slice(0, APP_CONFIG.maxResults));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [allSongs, search]);

  // Handlers
  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setTransposeOffset(0);
    setIsMaximized(false);
  };

  const handleTranspose = (delta: number) => {
    setTransposeOffset(prev => prev + delta);
  };

  const handleToggleChords = () => {
    setShowChords(prev => !prev);
  };

  const handleNotationChange = () => {
    setUseSpanishNotation(prev => !prev);
  };

  const handleToggleMaximize = () => {
    setIsMaximized(prev => !prev);
  };

  const handleCloseSong = () => {
    setSelectedSong(null);
    setIsMaximized(false);
  };

  const handleClearSearch = () => {
    setSearch("");
    setSelectedSong(null);
    setTransposeOffset(0);
  };

  const showResults = search.length >= APP_CONFIG.searchMinLength;

  // Si está maximizada, mostrar solo la canción
  if (isMaximized && selectedSong) {
    return (
      <SongCard
        song={selectedSong}
        transposedLyrics={transposedLyrics}
        showChords={showChords}
        useSpanishNotation={useSpanishNotation}
        transposeOffset={transposeOffset}
        onToggleChords={handleToggleChords}
        onTranspose={handleTranspose}
        onNotationChange={handleNotationChange}
        onClose={handleCloseSong}
        isMaximized={isMaximized}
        onToggleMaximize={handleToggleMaximize}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-100 animate-gradient bg-[length:400%_400%]">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de la página */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cancionero Completo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora todas las canciones litúrgicas disponibles. Busca por
              título y visualiza las letras con acordes.
            </p>
          </div>

          {/* Contenido principal */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Panel izquierdo - Búsqueda y estadísticas */}
            <div className="lg:col-span-1 space-y-6">
              {/* Barra de búsqueda */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  🔍 Buscar canción
                </h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Escribe el nombre de la canción..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="text-lg"
                  />
                  {search && (
                    <Button
                      variant="ghost"
                      onClick={handleClearSearch}
                      size="sm"
                    >
                      Limpiar búsqueda
                    </Button>
                  )}
                </div>
              </div>

              {/* Estadísticas */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-cyan-900 mb-4">
                  📊 Estadísticas
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-800">Total de canciones:</span>
                    <span className="font-bold text-cyan-900">
                      {allSongs.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-800">
                      Canciones predefinidas:
                    </span>
                    <span className="font-bold text-cyan-900">
                      {songs.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-800">Canciones personales:</span>
                    <span className="font-bold text-cyan-900">
                      {allSongs.length - songs.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Información de ayuda */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  💡 Cómo usar el cancionero
                </h3>
                <ul className="space-y-3 text-blue-800 text-sm">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Busca canciones por título</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Haz clic en una canción para verla completa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Transponé los acordes según necesites</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>
                      Usa el botón maximizar para verla sin distracciones
                    </span>
                  </li>
                </ul>
              </div>

              {/* Acceso rápido */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">
                  ⚡ Acceso rápido
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearch("")}
                    className="w-full justify-start"
                  >
                    <BookOpenIcon className="w-4 h-4 mr-2" />
                    Ver todas las canciones
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (window.location.href = "/add")}
                    className="w-full justify-start"
                  >
                    <MusicalNoteIcon className="w-4 h-4 mr-2" />
                    Agregar nueva canción
                  </Button>
                </div>
              </div>
            </div>

            {/* Panel derecho - Resultados y canción seleccionada */}
            <div className="lg:col-span-2">
              {selectedSong ? (
                <SongCard
                  song={selectedSong}
                  transposedLyrics={transposedLyrics}
                  showChords={showChords}
                  useSpanishNotation={useSpanishNotation}
                  transposeOffset={transposeOffset}
                  onToggleChords={handleToggleChords}
                  onTranspose={handleTranspose}
                  onNotationChange={handleNotationChange}
                  onClose={handleCloseSong}
                  onToggleMaximize={handleToggleMaximize}
                />
              ) : (
                <div className="space-y-6">
                  {/* Estado inicial */}
                  {!showResults && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
                      <BookOpenIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Explora el cancionero
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Busca una canción específica o haz clic en &quot;Ver
                        todas las canciones&quot; para explorar todo el
                        repertorio disponible.
                      </p>
                    </div>
                  )}

                  {/* Resultados */}
                  {showResults && (
                    <SearchResults
                      songs={filteredSongs}
                      onSongSelect={handleSongSelect}
                      isLoading={isLoading}
                    />
                  )}

                  {/* Lista completa cuando no hay búsqueda */}
                  {!search && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Todas las canciones ({allSongs.length})
                        </h3>
                        <div className="text-sm text-gray-600">
                          Haz clic en una canción para verla
                        </div>
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {allSongs.map((song, index) => (
                          <button
                            key={`${song.title}-${index}`}
                            onClick={() => handleSongSelect(song)}
                            className="w-full text-left p-4 rounded-lg bg-white/80 hover:bg-cyan-50 border border-gray-200 hover:border-cyan-300 transition-all duration-200 group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MusicalNoteIcon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                                  {song.title}
                                </h4>
                                {song.author && (
                                  <p className="text-sm text-gray-600">
                                    Por: {song.author}
                                  </p>
                                )}
                              </div>
                              <div className="text-gray-500 group-hover:text-green-600 transition-colors">
                                →
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
